import json
import os
import hashlib
import jwt
import random
import string
from datetime import datetime, timedelta

def handler(event: dict, context) -> dict:
    '''API для регистрации и авторизации пользователей в магазине DarkZone'''
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Authorization',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method == 'POST':
        try:
            import psycopg2
            
            body = json.loads(event.get('body', '{}'))
            action = body.get('action')
            
            db_url = os.environ.get('DATABASE_URL')
            jwt_secret = os.environ.get('JWT_SECRET')
            
            if not jwt_secret:
                return {
                    'statusCode': 500,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'JWT_SECRET not configured'})
                }
            
            conn = psycopg2.connect(db_url)
            cursor = conn.cursor()
            
            if action == 'register':
                email = body.get('email', '').strip().lower()
                username = body.get('username', '').strip()
                password = body.get('password', '')
                referral_code_used = body.get('referral_code', '').strip()
                
                if not email or not username or not password:
                    return {
                        'statusCode': 400,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'body': json.dumps({'error': 'Email, username и password обязательны'})
                    }
                
                if len(password) < 6:
                    return {
                        'statusCode': 400,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'body': json.dumps({'error': 'Пароль должен быть минимум 6 символов'})
                    }
                
                cursor.execute("SELECT id FROM users WHERE email = %s OR username = %s", (email, username))
                if cursor.fetchone():
                    return {
                        'statusCode': 400,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'body': json.dumps({'error': 'Пользователь с таким email или username уже существует'})
                    }
                
                password_hash = hashlib.sha256(password.encode()).hexdigest()
                user_referral_code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))
                
                referred_by_id = None
                if referral_code_used:
                    cursor.execute("SELECT id FROM users WHERE referral_code = %s", (referral_code_used,))
                    referrer = cursor.fetchone()
                    if referrer:
                        referred_by_id = referrer[0]
                
                cursor.execute(
                    """INSERT INTO users (email, password_hash, username, referral_code, referred_by) 
                       VALUES (%s, %s, %s, %s, %s) RETURNING id""",
                    (email, password_hash, username, user_referral_code, referred_by_id)
                )
                user_id = cursor.fetchone()[0]
                
                if referred_by_id:
                    bonus_amount = 50.00
                    cursor.execute(
                        "UPDATE users SET balance = balance + %s, referral_earnings = referral_earnings + %s WHERE id = %s",
                        (bonus_amount, bonus_amount, referred_by_id)
                    )
                    cursor.execute(
                        """INSERT INTO transactions (user_id, type, amount, description) 
                           VALUES (%s, %s, %s, %s)""",
                        (referred_by_id, 'referral_bonus', bonus_amount, f'Реферальный бонус за пользователя {username}')
                    )
                
                conn.commit()
                
                token = jwt.encode(
                    {
                        'user_id': user_id,
                        'username': username,
                        'exp': datetime.utcnow() + timedelta(days=30)
                    },
                    jwt_secret,
                    algorithm='HS256'
                )
                
                cursor.close()
                conn.close()
                
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({
                        'success': True,
                        'token': token,
                        'user': {
                            'id': user_id,
                            'username': username,
                            'email': email,
                            'referral_code': user_referral_code
                        }
                    })
                }
            
            elif action == 'login':
                email = body.get('email', '').strip().lower()
                password = body.get('password', '')
                
                if not email or not password:
                    return {
                        'statusCode': 400,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'body': json.dumps({'error': 'Email и password обязательны'})
                    }
                
                password_hash = hashlib.sha256(password.encode()).hexdigest()
                
                cursor.execute(
                    """SELECT id, username, email, balance, referral_code, is_active 
                       FROM users WHERE email = %s AND password_hash = %s""",
                    (email, password_hash)
                )
                user = cursor.fetchone()
                
                if not user:
                    return {
                        'statusCode': 401,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'body': json.dumps({'error': 'Неверный email или пароль'})
                    }
                
                if not user[5]:
                    return {
                        'statusCode': 403,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'body': json.dumps({'error': 'Аккаунт заблокирован'})
                    }
                
                cursor.execute(
                    "UPDATE users SET last_login = %s WHERE id = %s",
                    (datetime.utcnow(), user[0])
                )
                conn.commit()
                
                token = jwt.encode(
                    {
                        'user_id': user[0],
                        'username': user[1],
                        'exp': datetime.utcnow() + timedelta(days=30)
                    },
                    jwt_secret,
                    algorithm='HS256'
                )
                
                cursor.close()
                conn.close()
                
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({
                        'success': True,
                        'token': token,
                        'user': {
                            'id': user[0],
                            'username': user[1],
                            'email': user[2],
                            'balance': float(user[3]),
                            'referral_code': user[4]
                        }
                    })
                }
            
            else:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Неизвестное действие. Используйте action: register или login'})
                }
        
        except Exception as e:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': str(e)})
            }
    
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': 'Метод не поддерживается'})
    }
