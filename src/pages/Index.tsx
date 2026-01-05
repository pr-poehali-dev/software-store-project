import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const games = [
    {
      id: 1,
      name: 'CS:GO',
      description: 'Counter-Strike: Global Offensive - тактический шутер',
      image: 'https://cdn.poehali.dev/projects/cae294b2-6665-4376-bbfb-278d046b9096/files/69f5ff83-9475-48b0-983c-5655d9357193.jpg',
      products: 12
    },
    {
      id: 2,
      name: 'Valorant',
      description: 'Тактический шутер 5v5 от Riot Games',
      image: 'https://cdn.poehali.dev/projects/cae294b2-6665-4376-bbfb-278d046b9096/files/1a49be4a-64f0-4ea7-84aa-b5f4950f2e34.jpg',
      products: 8
    },
    {
      id: 3,
      name: 'Apex Legends',
      description: 'Королевская битва с уникальными персонажами',
      image: 'https://cdn.poehali.dev/projects/cae294b2-6665-4376-bbfb-278d046b9096/files/b89a3de9-0420-422d-a958-a7306aa2b7d4.jpg',
      products: 6
    },
    {
      id: 4,
      name: 'Fortnite',
      description: 'Популярная королевская битва',
      image: 'https://cdn.poehali.dev/projects/cae294b2-6665-4376-bbfb-278d046b9096/files/b89a3de9-0420-422d-a958-a7306aa2b7d4.jpg',
      products: 10
    },
    {
      id: 5,
      name: 'PUBG',
      description: 'Классическая королевская битва',
      image: 'https://cdn.poehali.dev/projects/cae294b2-6665-4376-bbfb-278d046b9096/files/b89a3de9-0420-422d-a958-a7306aa2b7d4.jpg',
      products: 7
    },
    {
      id: 6,
      name: 'Rust',
      description: 'Выживание в открытом мире',
      image: 'https://cdn.poehali.dev/projects/cae294b2-6665-4376-bbfb-278d046b9096/files/b89a3de9-0420-422d-a958-a7306aa2b7d4.jpg',
      products: 5
    }
  ];

  const popularProducts = [
    {
      id: 1,
      name: 'Pro Aim Assist',
      game: 'CS:GO',
      price: 1499,
      oldPrice: 2499,
      discount: 40,
      rating: 4.8,
      sales: 1234
    },
    {
      id: 2,
      name: 'ESP Wallhack Premium',
      game: 'Valorant',
      price: 1999,
      oldPrice: 3999,
      discount: 50,
      rating: 4.9,
      sales: 2341
    },
    {
      id: 3,
      name: 'Macro Pack Ultimate',
      game: 'Apex Legends',
      price: 999,
      oldPrice: 1499,
      discount: 33,
      rating: 4.7,
      sales: 876
    },
    {
      id: 4,
      name: 'Recoil Control Script',
      game: 'CS:GO',
      price: 799,
      oldPrice: 1299,
      discount: 38,
      rating: 4.6,
      sales: 543
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-primary/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center">
                <Icon name="Zap" className="text-white" size={24} />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                DarkZone
              </span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <button
                onClick={() => scrollToSection('home')}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === 'home' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Главная
              </button>
              <button
                onClick={() => scrollToSection('popular')}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === 'popular' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Популярное
              </button>
              <button
                onClick={() => scrollToSection('catalog')}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === 'catalog' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Каталог
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === 'about' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                О нас
              </button>
              <button
                onClick={() => scrollToSection('contacts')}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === 'contacts' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Контакты
              </button>
            </div>
            <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
              <Icon name="ShoppingCart" size={18} className="mr-2" />
              Корзина
            </Button>
          </div>
        </div>
      </nav>

      <section id="home" className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <Badge className="bg-primary/20 text-primary border-primary/30 hover:bg-primary/30">
                <Icon name="Sparkles" size={14} className="mr-1" />
                Лучшие программы для геймеров
              </Badge>
              <h1 className="text-5xl md:text-7xl font-black leading-tight">
                Твой путь к
                <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  победе
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Профессиональные читы, макросы и программы для популярных игр. Безопасно, быстро, эффективно.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  onClick={() => scrollToSection('catalog')}
                  className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-lg px-8"
                >
                  <Icon name="Gamepad2" size={20} className="mr-2" />
                  Смотреть каталог
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => scrollToSection('popular')}
                  className="border-primary/30 hover:bg-primary/10 text-lg px-8"
                >
                  <Icon name="TrendingUp" size={20} className="mr-2" />
                  Популярное
                </Button>
              </div>
              <div className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">15K+</div>
                  <div className="text-sm text-muted-foreground">Клиентов</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary">50+</div>
                  <div className="text-sm text-muted-foreground">Продуктов</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent">24/7</div>
                  <div className="text-sm text-muted-foreground">Поддержка</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="popular" className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge className="bg-secondary/20 text-secondary border-secondary/30 hover:bg-secondary/30 mb-4">
              <Icon name="Fire" size={14} className="mr-1" />
              Хиты продаж
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black mb-4">Популярное в этом месяце</h2>
            <p className="text-muted-foreground text-lg">Самые востребованные продукты с максимальными скидками</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularProducts.map((product) => (
              <Card
                key={product.id}
                className="group relative overflow-hidden bg-card border-primary/20 hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20"
              >
                <div className="absolute top-3 right-3 z-10">
                  <Badge className="bg-accent text-white border-0">-{product.discount}%</Badge>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="p-6 relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="border-primary/30 text-primary text-xs">
                      {product.game}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Icon name="Star" size={12} className="text-accent fill-accent" />
                      {product.rating}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-black text-primary">{product.price}₽</span>
                    <span className="text-sm text-muted-foreground line-through">{product.oldPrice}₽</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Icon name="Users" size={12} />
                      {product.sales} продаж
                    </span>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                    <Icon name="ShoppingCart" size={16} className="mr-2" />
                    В корзину
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="catalog" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge className="bg-accent/20 text-accent border-accent/30 hover:bg-accent/30 mb-4">
              <Icon name="Gamepad2" size={14} className="mr-1" />
              Выбери свою игру
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black mb-4">Каталог игр</h2>
            <p className="text-muted-foreground text-lg">Нажми на игру, чтобы увидеть все доступные продукты</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => (
              <Card
                key={game.id}
                className="group relative overflow-hidden bg-card border-primary/20 hover:border-primary/50 transition-all duration-300 cursor-pointer hover:scale-105"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={game.image}
                    alt={game.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <Badge className="bg-primary/20 text-primary border-primary/30 mb-3">
                    {game.products} продуктов
                  </Badge>
                  <h3 className="text-2xl font-black mb-2">{game.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{game.description}</p>
                  <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 group-hover:shadow-lg group-hover:shadow-primary/30">
                    Смотреть товары
                    <Icon name="ArrowRight" size={16} className="ml-2" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4 bg-card/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <Badge className="bg-primary/20 text-primary border-primary/30 hover:bg-primary/30 mb-4">
              <Icon name="Info" size={14} className="mr-1" />
              О магазине
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black mb-6">Кто мы такие?</h2>
          </div>
          <div className="space-y-6 text-lg text-muted-foreground">
            <p>
              <span className="text-foreground font-bold">DarkZone</span> — ведущий магазин игровых программ, читов и
              макросов с 2020 года. Мы помогаем геймерам улучшать свои навыки и достигать новых высот.
            </p>
            <p>
              Наша команда состоит из опытных разработчиков и геймеров, которые тестируют каждый продукт перед
              публикацией. Мы гарантируем безопасность и эффективность всех наших решений.
            </p>
            <div className="grid md:grid-cols-3 gap-6 pt-8">
              <Card className="p-6 text-center bg-card border-primary/20">
                <Icon name="Shield" size={32} className="mx-auto mb-4 text-primary" />
                <h3 className="font-bold text-xl mb-2">Безопасность</h3>
                <p className="text-sm text-muted-foreground">Все продукты проверены и защищены</p>
              </Card>
              <Card className="p-6 text-center bg-card border-secondary/20">
                <Icon name="Zap" size={32} className="mx-auto mb-4 text-secondary" />
                <h3 className="font-bold text-xl mb-2">Скорость</h3>
                <p className="text-sm text-muted-foreground">Мгновенная доставка после оплаты</p>
              </Card>
              <Card className="p-6 text-center bg-card border-accent/20">
                <Icon name="HeadphonesIcon" size={32} className="mx-auto mb-4 text-accent" />
                <h3 className="font-bold text-xl mb-2">Поддержка 24/7</h3>
                <p className="text-sm text-muted-foreground">Всегда на связи для вас</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <Badge className="bg-secondary/20 text-secondary border-secondary/30 hover:bg-secondary/30 mb-4">
              <Icon name="MessageCircle" size={14} className="mr-1" />
              Связь с нами
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black mb-6">Контакты</h2>
            <p className="text-muted-foreground text-lg">Выберите удобный способ связи</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-8 bg-card border-primary/20 hover:border-primary/50 transition-all hover:scale-105">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Icon name="Send" size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold">Telegram</h3>
              </div>
              <p className="text-muted-foreground mb-4">Напишите нам в Telegram для быстрой связи</p>
              <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                Открыть Telegram
              </Button>
            </Card>
            <Card className="p-8 bg-card border-secondary/20 hover:border-secondary/50 transition-all hover:scale-105">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                  <Icon name="MessageSquare" size={24} className="text-secondary" />
                </div>
                <h3 className="text-xl font-bold">Discord</h3>
              </div>
              <p className="text-muted-foreground mb-4">Присоединяйтесь к нашему Discord сообществу</p>
              <Button className="w-full bg-gradient-to-r from-secondary to-accent hover:opacity-90">
                Открыть Discord
              </Button>
            </Card>
            <Card className="p-8 bg-card border-accent/20 hover:border-accent/50 transition-all hover:scale-105">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                  <Icon name="Mail" size={24} className="text-accent" />
                </div>
                <h3 className="text-xl font-bold">Email</h3>
              </div>
              <p className="text-muted-foreground mb-4">support@darkzone.store</p>
              <Button className="w-full bg-gradient-to-r from-accent to-primary hover:opacity-90">
                Написать Email
              </Button>
            </Card>
            <Card className="p-8 bg-card border-primary/20 hover:border-primary/50 transition-all hover:scale-105">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Icon name="MessageCircle" size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold">WhatsApp</h3>
              </div>
              <p className="text-muted-foreground mb-4">+7 (999) 123-45-67</p>
              <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                Открыть WhatsApp
              </Button>
            </Card>
          </div>
        </div>
      </section>

      <footer className="border-t border-primary/20 py-8 px-4">
        <div className="container mx-auto text-center text-muted-foreground">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center">
              <Icon name="Zap" className="text-white" size={20} />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              DarkZone
            </span>
          </div>
          <p className="text-sm">© 2024 DarkZone. Все права защищены.</p>
          <p className="text-xs mt-2">Магазин игровых программ, читов и макросов</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;