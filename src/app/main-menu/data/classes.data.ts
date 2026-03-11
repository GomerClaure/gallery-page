export type DanceClass = {
  id: string;
  name: string;
  description: string;
  time: string;
  days: string[];
  daysText: string;
  image: string;
  level: string;
  ageRange: string;
  schedule: string;
  location: string;
  dances: string[];
  requirements: string[];
  whatsappUrl: string;
  qrImage?: string;
  teacher: {
    name: string;
    role: string;
    image: string;
  };
  environmentImages: string[];
};

export const danceClasses: DanceClass[] = [
  {
    id: 'mayores-1',
    name: 'Mayores 1',
    description: 'Grupo formativo inicial para estudiantes que empiezan su camino en la danza.',
    time: '18:00 - 19:30',
    days: ['Lun', 'Mie', 'Vie'],
    daysText: 'Lun, Mie y Vie',
    image: 'assets/main-menu/mayores2.jpeg',
    level: 'Inicial',
    ageRange: 'Desde los 18 anos',
    schedule: 'Lun, Mie y Vie | 18:00 - 19:30',
    location: 'Sucursal Bafott Centro',
    dances: ['Caporales', 'Cueca', 'Tinku'],
    requirements: ['Ropa comoda', 'Botella de agua', 'Panuelo tradicional'],
    whatsappUrl: 'https://wa.me/59170000001?text=Hola%2C%20quiero%20informacion%20sobre%20Mayores%201',
    teacher: {
      name: 'Mariela Quispe',
      role: 'Directora de grupo',
      image: 'assets/menu/academia.jpeg',
    },
    environmentImages: [
      'assets/ambientes/salon1.jpg',
      'assets/ambientes/salon2.jpeg',
      'assets/ambientes/salon2.1.jpeg',
    ],
  },
  {
    id: 'mayores-2',
    name: 'Mayores 2',
    description: 'Nivel de consolidacion para estudiantes con experiencia basica y trabajo escenico.',
    time: '19:30 - 21:00',
    days: ['Mar', 'Jue'],
    daysText: 'Mar y Jue',
    image: 'assets/main-menu/mayores3.jpeg',
    level: 'Intermedio',
    ageRange: 'Desde los 18 anos',
    schedule: 'Mar y Jue | 19:30 - 21:00',
    location: 'Sucursal Bafott Centro',
    dances: ['Morenada', 'Diablada', 'Tobas'],
    requirements: ['Ropa deportiva', 'Cuaderno de seguimiento', 'Agua'],
    whatsappUrl: 'https://wa.me/59170000002?text=Hola%2C%20quiero%20informacion%20sobre%20Mayores%202',
    teacher: {
      name: 'Diego Fernandez',
      role: 'Profesor',
      image: 'assets/menu/presentaciones.jpg',
    },
    environmentImages: [
      'assets/ambientes/salon2.jpeg',
      'assets/ambientes/salon1.jpg',
      'assets/ambientes/salon2.1.jpeg',
    ],
  },
  {
    id: 'prejuvenil-1',
    name: 'Prejuvenil 1',
    description: 'Espacio de crecimiento tecnico y expresivo para estudiantes en etapa prejuvenil.',
    time: '17:00 - 18:30',
    days: ['Mar', 'Jue'],
    daysText: 'Mar y Jue',
    image: 'assets/main-menu/prejuvenil1.jpeg',
    level: 'Formativo',
    ageRange: 'De 10 a 13 anos',
    schedule: 'Mar y Jue | 17:00 - 18:30',
    location: 'Sucursal Bafott Norte',
    dances: ['Chacarera', 'Saya', 'Taquirari'],
    requirements: ['Muda de ensayo', 'Botella de agua', 'Cuaderno'],
    whatsappUrl: 'https://wa.me/59170000003?text=Hola%2C%20quiero%20informacion%20sobre%20Prejuvenil%201',
    teacher: {
      name: 'Lucia Mendez',
      role: 'Profesora',
      image: 'assets/menu/clases.jpeg',
    },
    environmentImages: [
      'assets/ambientes/salon2.1.jpeg',
      'assets/ambientes/salon1.jpg',
      'assets/ambientes/salon2.jpeg',
    ],
  },
  {
    id: 'juvenil-1',
    name: 'Juvenil 1',
    description: 'Grupo dinamico para fortalecer tecnica, trabajo grupal y puesta en escena.',
    time: '18:00 - 19:30',
    days: ['Lun', 'Mie', 'Vie'],
    daysText: 'Lun, Mie y Vie',
    image: 'assets/main-menu/juvenil1.jpeg',
    level: 'Intermedio',
    ageRange: 'De 14 a 17 anos',
    schedule: 'Lun, Mie y Vie | 18:00 - 19:30',
    location: 'Sucursal Bafott Centro',
    dances: ['Caporales', 'Morenada', 'Cueca'],
    requirements: ['Ropa de ensayo', 'Botella de agua', 'Cabello recogido'],
    whatsappUrl: 'https://wa.me/59170000004?text=Hola%2C%20quiero%20informacion%20sobre%20Juvenil%201',
    teacher: {
      name: 'Mauricio Paredes',
      role: 'Profesor',
      image: 'assets/menu/taller.jpeg',
    },
    environmentImages: [
      'assets/ambientes/salon1.jpg',
      'assets/ambientes/salon2.1.jpeg',
      'assets/ambientes/salon2.jpeg',
    ],
  },
  {
    id: 'infantil-1',
    name: 'Infantil 1',
    description: 'Primer acercamiento a la danza para ninas y ninos, con enfoque ludico y corporal.',
    time: '10:00 - 12:00',
    days: ['Sab'],
    daysText: 'Solo Sabados',
    image: 'assets/main-menu/infantil1.jpeg',
    level: 'Inicial',
    ageRange: 'De 6 a 9 anos',
    schedule: 'Sabados | 10:00 - 12:00',
    location: 'Sucursal Bafott Sur',
    dances: ['Rondas', 'Cueca infantil', 'Juegos ritmicos'],
    requirements: ['Ropa comoda', 'Botella de agua', 'Zapatillas limpias'],
    whatsappUrl: 'https://wa.me/59170000005?text=Hola%2C%20quiero%20informacion%20sobre%20Infantil%201',
    teacher: {
      name: 'Carla Bustillos',
      role: 'Profesora',
      image: 'assets/menu/academia.jpeg',
    },
    environmentImages: [
      'assets/ambientes/salon2.jpeg',
      'assets/ambientes/salon1.jpg',
      'assets/ambientes/salon2.1.jpeg',
    ],
  },
];
