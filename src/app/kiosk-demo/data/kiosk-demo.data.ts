import {
  Branch,
  EventMediaAsset,
  GroupLevel,
  InterestGroup,
  LevelEvent,
  ScheduleSlot,
  Teacher,
} from '../models/kiosk.models';

const sampleVideo =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4';

const createSchedules = (
  room: string,
  times: Array<[string, string]>,
): ScheduleSlot[] => times.map(([day, time]) => ({ day, time, room }));

const createTeacher = (
  name: string,
  role: string,
  bio: string,
  portrait: string,
  isMain = false,
): Teacher => ({
  id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  name,
  role,
  bio,
  portrait,
  isMain,
});

const eventAssets = (
  prefix: string,
  items: Array<{
    thumbnail: string;
    type?: 'image' | 'video';
    category?: EventMediaAsset['category'];
    featured?: boolean;
  }>,
): EventMediaAsset[] =>
  items.map((item, index) => ({
    id: `${prefix}-asset-${index + 1}`,
    title: `${prefix} · ${index + 1}`,
    type: item.type ?? 'image',
    thumbnail: item.thumbnail,
    description:
      item.type === 'video'
        ? 'Registro audiovisual de presentación o montaje.'
        : 'Registro fotográfico relacionado al evento.',
    source: item.type === 'video' ? sampleVideo : item.thumbnail,
    category:
      item.category ?? (item.type === 'video' ? 'video' : index === 0 ? 'cover' : 'photo'),
    featured: item.featured ?? index === 0,
  }));

const createEvent = (
  id: string,
  name: string,
  year: string,
  summary: string,
  coverImage: string,
  media: EventMediaAsset[],
): LevelEvent => ({
  id,
  name,
  year,
  summary,
  coverImage,
  media,
});

const createLevel = (
  level: Omit<GroupLevel, 'events'> & { events: LevelEvent[] },
): GroupLevel => level;

const imagePool = [
  'assets/main-menu/infantil1.jpg',
  'assets/main-menu/prejuvenil1.jpg',
  'assets/main-menu/juvenil.jpg',
  'assets/main-menu/juvenil1.jpeg',
  'assets/main-menu/mayores1.jpg',
  'assets/main-menu/mayores2.jpg',
  'assets/main-menu/mayores3.jpg',
];

export const kioskBranches: Branch[] = [
  {
    id: 'bafott-heroinas',
    name: 'BAFOTT Heroínas',
    city: 'Cochabamba',
    address:
      'Av. Heroínas entre 25 de Mayo y España, Edificio Colegio de Abogados, 1er piso',
    note: 'Sede activa para formación regular y atención del kiosco.',
  },
  {
    id: 'bafott-centro',
    name: 'BAFOTT Centro',
    city: 'Cochabamba',
    address:
      'Calle General Acha entre Baptista y Ayacucho, Galería Acha Planta Baja',
    note: 'Sucursal principal con mayor programación de presentaciones y eventos.',
  },
  {
    id: 'bafott-sacaba',
    name: 'BAFOTT Sacaba',
    city: 'Sacaba',
    address:
      'Calle Coronel Sánchez, frente al Banco Mercantil Santa Cruz, Edif. Famarci 2do piso',
    note: 'Sede con programación vacacional y clases de temporada.',
  },
];

const melodiesEvent = createEvent(
  'melodias-de-mi-pueblo',
  'Melodías de mi Pueblo',
  '2026',
  'Primera obra de danza-teatro con cuadros escénicos, fotografías de ensayo y registros de función.',
  imagePool[3],
  eventAssets('Melodias', [
    { thumbnail: imagePool[3], category: 'cover', featured: true },
    { thumbnail: imagePool[0], category: 'photo' },
    { thumbnail: imagePool[1], category: 'photo' },
    { thumbnail: imagePool[2], type: 'video', category: 'presentation' },
    { thumbnail: imagePool[4], category: 'backstage' },
    { thumbnail: imagePool[5], type: 'video', category: 'video' },
  ]),
);

const soledadEvent = createEvent(
  'soledad',
  'Soledad',
  '2026',
  'Obra escénica de danza-teatro con enfoque narrativo, fotografías institucionales y video resumen.',
  imagePool[4],
  eventAssets('Soledad', [
    { thumbnail: imagePool[4], category: 'cover', featured: true },
    { thumbnail: imagePool[5], category: 'photo' },
    { thumbnail: imagePool[6], category: 'photo' },
    { thumbnail: imagePool[2], type: 'video', category: 'presentation' },
    { thumbnail: imagePool[1], category: 'backstage' },
  ]),
);

const boliviaMagicaEvent = createEvent(
  'bolivia-magica',
  'Bolivia Mágica',
  '2026',
  'Espectáculo del Bicentenario con repertorio amplio, cobertura visual y escenas de elenco.',
  imagePool[5],
  eventAssets('Bolivia Magica', [
    { thumbnail: imagePool[5], category: 'cover', featured: true },
    { thumbnail: imagePool[0], category: 'photo' },
    { thumbnail: imagePool[6], category: 'photo' },
    { thumbnail: imagePool[2], type: 'video', category: 'presentation' },
    { thumbnail: imagePool[3], type: 'video', category: 'video' },
    { thumbnail: imagePool[1], category: 'backstage' },
  ]),
);

const bolivianitaEvent = createEvent(
  'bolivianita-2-0',
  'Bolivianita 2.0',
  '2026',
  'Presentación escénica con momentos de escenario, camarines y registros audiovisuales breves.',
  imagePool[1],
  eventAssets('Bolivianita', [
    { thumbnail: imagePool[1], category: 'cover', featured: true },
    { thumbnail: imagePool[2], category: 'photo' },
    { thumbnail: imagePool[3], category: 'photo' },
    { thumbnail: imagePool[0], type: 'video', category: 'presentation' },
  ]),
);

export const kioskGroups: InterestGroup[] = [
  {
    id: 'ninos',
    name: 'Niños',
    audience: '5 a 11 años',
    tagline: 'Primer contacto escénico con juego, ritmo y tradición.',
    description:
      'Una experiencia guiada para despertar coordinación, memoria corporal y amor por las danzas bolivianas.',
    accent: 'from-amber-200 via-white to-orange-100',
    coverImage: imagePool[0],
    levels: [
      createLevel({
        id: 'ninos-1',
        name: 'Niños 1',
        shortDescription: 'Nivel inicial cargado desde afiche y ajustado a experiencia táctil.',
        description:
          'Nivel orientado a niñas y niños que comienzan en danza folclórica. Se prioriza coordinación, musicalidad inicial, presencia escénica y trabajo grupal.',
        schedules: createSchedules('Salón principal', [
          ['Martes', '09:30 - 11:00'],
          ['Jueves', '09:30 - 11:00'],
        ]),
        dances: ['Cueca Cochabambina', 'Caporales', 'Tinku', 'Salay'],
        teachers: [
          createTeacher(
            'Fabiola Marquez Mamani',
            'principal',
            'Profesora de danza folclórica con enfoque formativo para etapas iniciales y montaje escénico infantil.',
            'assets/face.jpg',
            true,
          ),
          createTeacher(
            'Jhanneth Higuera Siles',
            'auxiliar',
            'Apoyo pedagógico en coordinación motriz, seguimiento de grupos y acompañamiento escénico infantil.',
            'assets/face.jpg',
          ),
        ],
        events: [melodiesEvent, bolivianitaEvent],
      }),
      createLevel({
        id: 'ninos-2',
        name: 'Niños 2',
        shortDescription: 'Mayor coordinación, montaje corto y lectura de escenario.',
        description:
          'Consolida memoria coreográfica, desplazamiento y ensamble grupal para muestras y presentaciones especiales.',
        schedules: createSchedules('Salón principal', [
          ['Lunes', '18:00 - 19:00'],
          ['Miércoles', '18:00 - 19:00'],
          ['Viernes', '18:00 - 19:00'],
        ]),
        dances: ['Carnavalito', 'Tobas', 'Taquirari', 'Morenada'],
        teachers: [createTeacher(
          'Jhanneth Higuera Siles',
          'Profesora principal',
          'Especialista en repertorio infantil y procesos de transición al escenario.',
          'assets/face.jpg',
        )],
        events: [soledadEvent, bolivianitaEvent],
      }),
    ],
  },
  {
    id: 'jovenes',
    name: 'Jóvenes',
    audience: '12 a 28 años',
    tagline: 'Energía, identidad y proyección para escenario.',
    description:
      'Programa con mayor reto coreográfico, resistencia física, limpieza de líneas y repertorio de escena.',
    accent: 'from-sky-200 via-white to-cyan-100',
    coverImage: imagePool[3],
    levels: [
      createLevel({
        id: 'jovenes-1',
        name: 'Jóvenes 1',
        shortDescription: 'Transición al repertorio con técnica, resistencia y montaje.',
        description:
          'Nivel intermedio con enfoque en identidad escénica, precisión rítmica y repertorio con proyección de elenco.',
        schedules: createSchedules('Salón juvenil', [
          ['Lunes', '16:00 - 17:00'],
          ['Miércoles', '16:00 - 17:00'],
          ['Viernes', '16:00 - 17:00'],
        ]),
        dances: ['Caporales', 'Tinku', 'Morenada', 'Tobas'],
        teachers: [
          createTeacher(
            'Cristhian Fuente Villarroel',
            'principal',
            'Instructor de danza con trabajo enfocado en potencia, disciplina y lectura escénica juvenil.',
            'assets/face.jpg',
            true,
          ),
          createTeacher(
            'Israel Fuentes Villarroel',
            'principal',
            'Codirección del nivel para montaje, limpieza coreográfica y preparación para escenario.',
            'assets/face.jpg',
            true,
          ),
          createTeacher(
            'Yorgeli Ayaviri Vargas',
            'auxiliar',
            'Apoyo de aula en ensayos, correcciones por bloques y acompañamiento de elencos.',
            'assets/face.jpg',
          ),
        ],
        events: [melodiesEvent, boliviaMagicaEvent],
      }),
      createLevel({
        id: 'jovenes-2',
        name: 'Jóvenes 2',
        shortDescription: 'Repertorio escénico avanzado y presentaciones de temporada.',
        description:
          'Pensado para bailarines con experiencia que se preparan para cuadros completos y funciones institucionales.',
        schedules: createSchedules('Salón juvenil', [
          ['Martes', '09:30 - 11:00'],
          ['Jueves', '09:30 - 11:00'],
        ]),
        dances: ['Llamerada', 'Cueca Chuquisaqueña', 'Pujllay', 'Saya Afroboliviana'],
        teachers: [createTeacher(
          'Israel Fuentes Villarroel',
          'Profesor principal',
          'Profesor de danza y montaje grupal con foco en limpieza, sincronía y narrativa escénica.',
          'assets/face.jpg',
        )],
        events: [soledadEvent, boliviaMagicaEvent],
      }),
    ],
  },
  {
    id: 'adultos',
    name: 'Adultos',
    audience: '18 años en adelante',
    tagline: 'Formación, acondicionamiento y repertorio de alto impacto.',
    description:
      'Programa para adultos que desean perfeccionarse o retomar danza con una experiencia refinada y exigente.',
    accent: 'from-rose-200 via-white to-orange-100',
    coverImage: imagePool[4],
    levels: [
      createLevel({
        id: 'adultos-1',
        name: 'Adultos 1',
        shortDescription: 'Ingreso al repertorio adulto con técnica progresiva.',
        description:
          'Ideal para quienes vuelven a bailar o quieren iniciarse con estructura, cuidado corporal y repertorio social-escénico.',
        schedules: createSchedules('Salón mayor', [
          ['Lunes', '20:00 - 21:00'],
          ['Miércoles', '20:00 - 21:00'],
          ['Viernes', '20:00 - 21:00'],
        ]),
        dances: ['Cueca Cochabambina', 'Morenada', 'Tinku', 'Taquirari'],
        teachers: [createTeacher(
          'Erlinda Medrano Z.',
          'Profesora principal',
          'Profesora de danza folclórica para repertorio adulto y trabajo escénico de temporada.',
          'assets/face.jpg',
        )],
        events: [boliviaMagicaEvent, melodiesEvent],
      }),
      createLevel({
        id: 'adultos-2',
        name: 'Adultos 2',
        shortDescription: 'Nivel escénico avanzado con puestas de temporada.',
        description:
          'Grupo orientado a presencia de escenario, repertorio exigente y montaje de cuadros para presentaciones institucionales.',
        schedules: createSchedules('Salón mayor', [['Sábado', '15:00 - 17:00']]),
        dances: ['Diablada', 'Kullawada', 'Cueca Tarijeña', 'Waca Waca'],
        teachers: [createTeacher(
          'Shanesia Ayaviri Vargas',
          'Profesora principal',
          'Instructora de danza enfocada en interpretación y proyección escénica de alto impacto.',
          'assets/face.jpg',
        )],
        events: [soledadEvent, bolivianitaEvent],
      }),
    ],
  },
  {
    id: 'talleres',
    name: 'Talleres',
    audience: 'Módulos especiales',
    tagline: 'Laboratorios breves, intensivos y presentaciones temáticas.',
    description:
      'Espacios flexibles para módulos especiales, temporada corta y laboratorios de repertorio.',
    accent: 'from-emerald-200 via-white to-teal-100',
    coverImage: imagePool[2],
    levels: [
      createLevel({
        id: 'talleres-escena',
        name: 'Taller escénico',
        shortDescription: 'Laboratorio de escena, presencia y lectura espacial.',
        description:
          'Módulo intensivo para fortalecer interpretación, entradas, cierres y lectura del escenario.',
        schedules: createSchedules('Foro principal', [['Sábado', '17:00 - 18:00']]),
        dances: ['Cueca Cochabambina', 'Cueca Tarijeña', 'Improvisación folclórica'],
        teachers: [createTeacher(
          'Yorgeli Ayaviri Vargas',
          'Facilitadora principal',
          'Instructora de danza con énfasis en escena, composición grupal y montaje breve.',
          'assets/face.jpg',
        )],
        events: [melodiesEvent, soledadEvent],
      }),
    ],
  },
];
