PRAGMA foreign_keys = ON;

-- =====================================================
-- BRANCHES / SUCURSALES
-- =====================================================
INSERT OR IGNORE INTO branches (name, slug, address, description, is_active)
VALUES
  (
    'BAFOTT Heroínas',
    'bafott-heroinas',
    'Av. Heroínas entre 25 de Mayo y España, frente a la heladería Dumbo, Edificio Colegio de Abogados, 1er piso',
    'Sucursal Heroínas de BAFOTT',
    1
  ),
  (
    'BAFOTT Centro',
    'bafott-centro',
    'Calle General Acha entre Baptista y Ayacucho, Galería Acha Planta Baja, frente a las gradas de Entel',
    'Sucursal Centro de BAFOTT',
    1
  ),
  (
    'BAFOTT Sacaba',
    'bafott-sacaba',
    'Calle Coronel Sánchez, a media cuadra de la Plaza Principal de Sacaba, frente al Banco Mercantil Santa Cruz, Edif. Famarci 2do piso',
    'Sucursal Sacaba de BAFOTT',
    1
  );

-- =====================================================
-- GROUP TYPES / TIPOS DE PROGRAMA
-- =====================================================
INSERT OR IGNORE INTO group_types (name, slug, description, sort_order, is_active)
VALUES
  ('Clases regulares', 'clases-regulares', 'Programas regulares de formación en danza folklórica', 1, 1),
  ('Talleres', 'talleres', 'Talleres o módulos especiales', 2, 1),
  ('Vacacionales', 'vacacionales', 'Programas vacacionales', 3, 1),
  ('Obras', 'obras', 'Obras y danza-teatro', 4, 1),
  ('Presentaciones', 'presentaciones', 'Presentaciones y espectáculos', 5, 1);

-- =====================================================
-- GROUPS / GRUPOS
-- Aquí tomé cada oferta visible como un grupo inicial.
-- Luego puedes refinar niveles si deseas.
-- =====================================================

-- HEROINAS
INSERT OR IGNORE INTO groups (
  branch_id, group_type_id, name, slug, description, status, sort_order, is_active
)
VALUES
  (
    (SELECT id FROM branches WHERE slug = 'bafott-heroinas'),
    (SELECT id FROM group_types WHERE slug = 'clases-regulares'),
    'Niños Heroínas',
    'ninos-heroinas',
    'Grupo de niños de la sucursal Heroínas',
    'active',
    1,
    1
  ),
  (
    (SELECT id FROM branches WHERE slug = 'bafott-heroinas'),
    (SELECT id FROM group_types WHERE slug = 'clases-regulares'),
    'Jóvenes Heroínas',
    'jovenes-heroinas',
    'Grupo de jóvenes de la sucursal Heroínas',
    'active',
    2,
    1
  ),
  (
    (SELECT id FROM branches WHERE slug = 'bafott-heroinas'),
    (SELECT id FROM group_types WHERE slug = 'clases-regulares'),
    'Adultos Heroínas',
    'adultos-heroinas',
    'Grupo de adultos de la sucursal Heroínas',
    'active',
    3,
    1
  ),
  (
    (SELECT id FROM branches WHERE slug = 'bafott-heroinas'),
    (SELECT id FROM group_types WHERE slug = 'clases-regulares'),
    'Folklore Heroínas',
    'folklore-heroinas',
    'Grupo de folklore de la sucursal Heroínas',
    'active',
    4,
    1
  );

-- CENTRO
INSERT OR IGNORE INTO groups (
  branch_id, group_type_id, name, slug, description, status, sort_order, is_active
)
VALUES
  (
    (SELECT id FROM branches WHERE slug = 'bafott-centro'),
    (SELECT id FROM group_types WHERE slug = 'clases-regulares'),
    'Niños Centro Mañana',
    'ninos-centro-manana',
    'Grupo de niños turno mañana en sucursal Centro',
    'active',
    1,
    1
  ),
  (
    (SELECT id FROM branches WHERE slug = 'bafott-centro'),
    (SELECT id FROM group_types WHERE slug = 'clases-regulares'),
    'Jóvenes Centro Mañana',
    'jovenes-centro-manana',
    'Grupo de jóvenes turno mañana en sucursal Centro',
    'active',
    2,
    1
  ),
  (
    (SELECT id FROM branches WHERE slug = 'bafott-centro'),
    (SELECT id FROM group_types WHERE slug = 'clases-regulares'),
    'Niños Centro Tarde',
    'ninos-centro-tarde',
    'Grupo de niños turno tarde en sucursal Centro',
    'active',
    3,
    1
  ),
  (
    (SELECT id FROM branches WHERE slug = 'bafott-centro'),
    (SELECT id FROM group_types WHERE slug = 'clases-regulares'),
    'Jóvenes Centro Tarde',
    'jovenes-centro-tarde',
    'Grupo de jóvenes turno tarde en sucursal Centro',
    'active',
    4,
    1
  ),
  (
    (SELECT id FROM branches WHERE slug = 'bafott-centro'),
    (SELECT id FROM group_types WHERE slug = 'clases-regulares'),
    'Mayores Centro Tarde',
    'mayores-centro-tarde',
    'Grupo de mayores turno tarde en sucursal Centro',
    'active',
    5,
    1
  );

-- SACABA
INSERT OR IGNORE INTO groups (
  branch_id, group_type_id, name, slug, description, status, sort_order, is_active
)
VALUES
  (
    (SELECT id FROM branches WHERE slug = 'bafott-sacaba'),
    (SELECT id FROM group_types WHERE slug = 'vacacionales'),
    'Niños Sacaba Vacacional',
    'ninos-sacaba-vacacional',
    'Grupo vacacional de niños en sucursal Sacaba',
    'active',
    1,
    1
  ),
  (
    (SELECT id FROM branches WHERE slug = 'bafott-sacaba'),
    (SELECT id FROM group_types WHERE slug = 'vacacionales'),
    'Jóvenes Sacaba Vacacional',
    'jovenes-sacaba-vacacional',
    'Grupo vacacional de jóvenes en sucursal Sacaba',
    'active',
    2,
    1
  ),
  (
    (SELECT id FROM branches WHERE slug = 'bafott-sacaba'),
    (SELECT id FROM group_types WHERE slug = 'vacacionales'),
    'Mayores Sacaba Vacacional',
    'mayores-sacaba-vacacional',
    'Grupo vacacional de mayores en sucursal Sacaba',
    'active',
    3,
    1
  );

-- TALLERES
INSERT OR IGNORE INTO groups (
  branch_id, group_type_id, name, slug, description, status, start_date, end_date, sort_order, is_active
)
VALUES
  (
    (SELECT id FROM branches WHERE slug = 'bafott-centro'),
    (SELECT id FROM group_types WHERE slug = 'talleres'),
    'Taller Cueca Cochabambina - Módulo 1',
    'taller-cueca-cochabambina-modulo-1',
    'Aprende a bailar cueca solo - módulo 1',
    'upcoming',
    '2026-04-19',
    '2026-05-10',
    1,
    1
  ),
  (
    (SELECT id FROM branches WHERE slug = 'bafott-centro'),
    (SELECT id FROM group_types WHERE slug = 'talleres'),
    'Taller Cueca Tarijeña - Módulo 2',
    'taller-cueca-tarijena-modulo-2',
    'Aprende a bailar cueca solo - módulo 2',
    'upcoming',
    '2026-04-19',
    '2026-05-10',
    2,
    1
  );

-- =====================================================
-- LEVELS / NIVELES
-- Por ahora creo un nivel único por cada grupo.
-- Luego puedes dividir en Básico / Intermedio / Avanzado si corresponde.
-- =====================================================
INSERT OR IGNORE INTO levels (
  group_id, name, slug, short_description, full_description, age_range, min_age, max_age,
  level_order, status, is_active
)
SELECT
  g.id,
  'Nivel general',
  'nivel-general',
  'Nivel inicial cargado desde afiche',
  'Información inicial importada desde material promocional.',
  CASE
    WHEN g.slug = 'ninos-heroinas' THEN '5 a 11 años'
    WHEN g.slug = 'jovenes-heroinas' THEN '12 a 28 años'
    WHEN g.slug = 'adultos-heroinas' THEN '30 años para adelante'
    WHEN g.slug = 'folklore-heroinas' THEN '12 años para adelante'
    WHEN g.slug = 'ninos-centro-manana' THEN '5 a 11 años'
    WHEN g.slug = 'jovenes-centro-manana' THEN '12 a 28 años'
    WHEN g.slug = 'ninos-centro-tarde' THEN '5 a 11 años'
    WHEN g.slug = 'jovenes-centro-tarde' THEN '12 a 28 años'
    WHEN g.slug = 'mayores-centro-tarde' THEN '18 en adelante'
    WHEN g.slug = 'ninos-sacaba-vacacional' THEN '5 a 11 años'
    WHEN g.slug = 'jovenes-sacaba-vacacional' THEN '12 a 17 años'
    WHEN g.slug = 'mayores-sacaba-vacacional' THEN '18 en adelante'
    WHEN g.slug = 'taller-cueca-cochabambina-modulo-1' THEN 'General'
    WHEN g.slug = 'taller-cueca-tarijena-modulo-2' THEN 'General'
    ELSE NULL
  END,
  CASE
    WHEN g.slug IN ('ninos-heroinas', 'ninos-centro-manana', 'ninos-centro-tarde', 'ninos-sacaba-vacacional') THEN 5
    WHEN g.slug IN ('jovenes-heroinas', 'jovenes-centro-manana', 'jovenes-centro-tarde') THEN 12
    WHEN g.slug = 'adultos-heroinas' THEN 30
    WHEN g.slug = 'folklore-heroinas' THEN 12
    WHEN g.slug = 'jovenes-sacaba-vacacional' THEN 12
    WHEN g.slug = 'mayores-sacaba-vacacional' THEN 18
    WHEN g.slug = 'mayores-centro-tarde' THEN 18
    ELSE NULL
  END,
  CASE
    WHEN g.slug = 'ninos-heroinas' THEN 11
    WHEN g.slug = 'ninos-centro-manana' THEN 11
    WHEN g.slug = 'ninos-centro-tarde' THEN 11
    WHEN g.slug = 'ninos-sacaba-vacacional' THEN 11
    WHEN g.slug = 'jovenes-heroinas' THEN 28
    WHEN g.slug = 'jovenes-centro-manana' THEN 28
    WHEN g.slug = 'jovenes-centro-tarde' THEN 28
    WHEN g.slug = 'jovenes-sacaba-vacacional' THEN 17
    WHEN g.slug = 'adultos-heroinas' THEN NULL
    WHEN g.slug = 'folklore-heroinas' THEN NULL
    WHEN g.slug = 'mayores-centro-tarde' THEN NULL
    WHEN g.slug = 'mayores-sacaba-vacacional' THEN NULL
    ELSE NULL
  END,
  1,
  'active',
  1
FROM groups g
WHERE NOT EXISTS (
  SELECT 1 FROM levels l WHERE l.group_id = g.id AND l.slug = 'nivel-general'
);

-- =====================================================
-- SCHEDULES / HORARIOS
-- =====================================================

-- Heroínas niños: lunes, miércoles y viernes 15:00 - 16:00
INSERT OR IGNORE INTO schedules (level_id, day_of_week, start_time, end_time, room_name, notes, is_active)
SELECT l.id, d.day_of_week, '15:00', '16:00', NULL, 'Horario visible en afiche', 1
FROM levels l
JOIN groups g ON g.id = l.group_id
JOIN (
  SELECT 1 AS day_of_week
  UNION ALL SELECT 3
  UNION ALL SELECT 5
) d
WHERE g.slug = 'ninos-heroinas';

-- Heroínas adultos: lunes, miércoles y viernes 20:00 - 21:00
INSERT OR IGNORE INTO schedules (level_id, day_of_week, start_time, end_time, room_name, notes, is_active)
SELECT l.id, d.day_of_week, '20:00', '21:00', NULL, 'Horario visible en afiche', 1
FROM levels l
JOIN groups g ON g.id = l.group_id
JOIN (
  SELECT 1 AS day_of_week
  UNION ALL SELECT 3
  UNION ALL SELECT 5
) d
WHERE g.slug = 'adultos-heroinas';

-- Heroínas folklore: sábado 15:00 - 17:00
INSERT OR IGNORE INTO schedules (level_id, day_of_week, start_time, end_time, room_name, notes, is_active)
SELECT l.id, 6, '15:00', '17:00', NULL, 'Solo sábados', 1
FROM levels l
JOIN groups g ON g.id = l.group_id
WHERE g.slug = 'folklore-heroinas';

-- Centro niños mañana: martes y jueves 09:30 - 11:00
INSERT OR IGNORE INTO schedules (level_id, day_of_week, start_time, end_time, room_name, notes, is_active)
SELECT l.id, d.day_of_week, '09:30', '11:00', NULL, 'Turno mañana', 1
FROM levels l
JOIN groups g ON g.id = l.group_id
JOIN (
  SELECT 2 AS day_of_week
  UNION ALL SELECT 4
) d
WHERE g.slug = 'ninos-centro-manana';

-- Centro jóvenes mañana: martes y jueves 09:30 - 11:00
INSERT OR IGNORE INTO schedules (level_id, day_of_week, start_time, end_time, room_name, notes, is_active)
SELECT l.id, d.day_of_week, '09:30', '11:00', NULL, 'Turno mañana', 1
FROM levels l
JOIN groups g ON g.id = l.group_id
JOIN (
  SELECT 2 AS day_of_week
  UNION ALL SELECT 4
) d
WHERE g.slug = 'jovenes-centro-manana';

-- Centro niños tarde: lunes, miércoles y viernes 18:00 - 19:00
INSERT OR IGNORE INTO schedules (level_id, day_of_week, start_time, end_time, room_name, notes, is_active)
SELECT l.id, d.day_of_week, '18:00', '19:00', NULL, 'Turno tarde', 1
FROM levels l
JOIN groups g ON g.id = l.group_id
JOIN (
  SELECT 1 AS day_of_week
  UNION ALL SELECT 3
  UNION ALL SELECT 5
) d
WHERE g.slug = 'ninos-centro-tarde';

-- Centro jóvenes tarde: lunes, miércoles y viernes 16:00 - 17:00
INSERT OR IGNORE INTO schedules (level_id, day_of_week, start_time, end_time, room_name, notes, is_active)
SELECT l.id, d.day_of_week, '16:00', '17:00', NULL, 'Turno tarde', 1
FROM levels l
JOIN groups g ON g.id = l.group_id
JOIN (
  SELECT 1 AS day_of_week
  UNION ALL SELECT 3
  UNION ALL SELECT 5
) d
WHERE g.slug = 'jovenes-centro-tarde';

-- Centro mayores tarde: lunes, miércoles y viernes 17:00 - 18:00
INSERT OR IGNORE INTO schedules (level_id, day_of_week, start_time, end_time, room_name, notes, is_active)
SELECT l.id, d.day_of_week, '17:00', '18:00', NULL, 'Turno tarde', 1
FROM levels l
JOIN groups g ON g.id = l.group_id
JOIN (
  SELECT 1 AS day_of_week
  UNION ALL SELECT 3
  UNION ALL SELECT 5
) d
WHERE g.slug = 'mayores-centro-tarde';

-- Sacaba vacacional niños: lunes, miércoles y viernes 10:00 - 11:00
INSERT OR IGNORE INTO schedules (level_id, day_of_week, start_time, end_time, room_name, notes, is_active)
SELECT l.id, d.day_of_week, '10:00', '11:00', NULL, 'Vacacional', 1
FROM levels l
JOIN groups g ON g.id = l.group_id
JOIN (
  SELECT 1 AS day_of_week
  UNION ALL SELECT 3
  UNION ALL SELECT 5
) d
WHERE g.slug = 'ninos-sacaba-vacacional';

-- Sacaba vacacional jóvenes: lunes, miércoles y viernes 11:00 - 12:00
INSERT OR IGNORE INTO schedules (level_id, day_of_week, start_time, end_time, room_name, notes, is_active)
SELECT l.id, d.day_of_week, '11:00', '12:00', NULL, 'Vacacional', 1
FROM levels l
JOIN groups g ON g.id = l.group_id
JOIN (
  SELECT 1 AS day_of_week
  UNION ALL SELECT 3
  UNION ALL SELECT 5
) d
WHERE g.slug = 'jovenes-sacaba-vacacional';

-- Sacaba vacacional mayores: martes y jueves 18:30 - 20:00
INSERT OR IGNORE INTO schedules (level_id, day_of_week, start_time, end_time, room_name, notes, is_active)
SELECT l.id, d.day_of_week, '18:30', '20:00', NULL, 'Vacacional', 1
FROM levels l
JOIN groups g ON g.id = l.group_id
JOIN (
  SELECT 2 AS day_of_week
  UNION ALL SELECT 4
) d
WHERE g.slug = 'mayores-sacaba-vacacional';

-- Taller cueca cochabambina: sábado 17:00 - 18:00
INSERT OR IGNORE INTO schedules (level_id, day_of_week, start_time, end_time, room_name, notes, is_active)
SELECT l.id, 6, '17:00', '18:00', NULL, 'Duración 4 sábados', 1
FROM levels l
JOIN groups g ON g.id = l.group_id
WHERE g.slug = 'taller-cueca-cochabambina-modulo-1';

-- Taller cueca tarijeña: sábado 18:00 - 19:00
INSERT OR IGNORE INTO schedules (level_id, day_of_week, start_time, end_time, room_name, notes, is_active)
SELECT l.id, 6, '18:00', '19:00', NULL, 'Duración 4 sábados', 1
FROM levels l
JOIN groups g ON g.id = l.group_id
WHERE g.slug = 'taller-cueca-tarijena-modulo-2';

-- =====================================================
-- EVENTS / EVENTOS
-- =====================================================
INSERT OR IGNORE INTO events (
  name, slug, description, event_date, location, status, is_active
)
VALUES
  (
    'Soledad',
    'soledad',
    'Obra de danza-teatro. Una historia de amor cochabambino.',
    '2026-03-28',
    'Teatro ACHA',
    'published',
    1
  ),
  (
    'Melodías de mi Pueblo',
    'melodias-de-mi-pueblo',
    'Primera obra de danza-teatro.',
    '2026-10-25',
    'Teatro ACHA',
    'published',
    1
  ),
  (
    'Bolivia Mágica',
    'bolivia-magica',
    'Espectáculo del Bicentenario de Bolivia.',
    '2026-08-21',
    'Teatro ACHA',
    'published',
    1
  ),
  (
    'Bolivianita 2.0',
    'bolivianita-2-0',
    'Presentación escénica de BAFOTT.',
    '2026-09-19',
    'Teatro Adela Zamudio',
    'published',
    1
  );

-- =====================================================
-- SETTINGS / CONFIGURACIÓN GENERAL
-- =====================================================
INSERT OR IGNORE INTO settings (setting_key, setting_value, description)
VALUES
  ('academy_name', 'Ballet Folklórico Tradiciones de Mi Tierra', 'Nombre principal de la academia'),
  ('academy_short_name', 'BAFOTT', 'Nombre corto'),
  ('welcome_message', 'Toca la pantalla para conocer nuestros grupos de danza', 'Mensaje principal del kiosco'),
  ('idle_timeout_seconds', '30', 'Tiempo de inactividad para volver al inicio');



-- =========================
-- dances
-- =========================
INSERT OR IGNORE INTO dances (name, slug, description, origin_region, is_active)
VALUES
('Cueca Cochabambina', 'cueca-cochabambina', 'Danza tradicional de Cochabamba', 'Cochabamba', 1),
('Cueca Paceña', 'cueca-pacena', 'Cueca del altiplano paceño', 'La Paz', 1),
('Cueca Tarijeña', 'cueca-tarijena', 'Cueca del sur de Bolivia', 'Tarija', 1),
('Caporales', 'caporales', 'Danza moderna inspirada en ritmos afrobolivianos', 'La Paz', 1),
('Tinku', 'tinku', 'Danza ritual del norte de Potosí', 'Potosí', 1),
('Morenada', 'morenada', 'Danza emblemática del altiplano', 'La Paz', 1),
('Diablada', 'diablada', 'Danza de máscaras del carnaval', 'Oruro', 1),
('Saya Afroboliviana', 'saya-afroboliviana', 'Danza afroboliviana', 'Yungas', 1),
('Chacarera', 'chacarera', 'Danza tradicional del sur', 'Tarija', 1),
('Taquirari', 'taquirari', 'Danza alegre del oriente', 'Santa Cruz', 1),
('Carnavalito', 'carnavalito', 'Danza festiva andina', 'Potosí', 1),
('Kullawada', 'kullawada', 'Danza textil andina', 'La Paz', 1),
('Llamerada', 'llamerada', 'Danza de pastores', 'Altiplano', 1),
('Doctorcitos', 'doctorcitos', 'Danza tradicional urbana', 'La Paz', 1),
('Waca Waca', 'waca-waca', 'Danza satírica', 'Altiplano', 1),
('Pujllay', 'pujllay', 'Danza de celebración', 'Chuquisaca', 1),
('Salay', 'salay', 'Danza juvenil popular', 'Cochabamba', 1),
('Ayarichi', 'ayarichi', 'Danza ritual ancestral', 'Potosí', 1),
('Chovena', 'chovena', 'Danza amazónica', 'Beni', 1),
('Torito', 'torito', 'Danza de festividad', 'Potosí', 1),
('Kaluyo', 'kaluyo', 'Danza tradicional antigua', 'Altiplano', 1),
('Cueca Chuquisaqueña', 'cueca-chuquisaquena', 'Cueca elegante', 'Chuquisaca', 1),
('Bailecito', 'bailecito', 'Danza del sur andino', 'Tarija', 1),
('Zampoñada', 'zamponada', 'Danza con instrumentos andinos', 'Altiplano', 1),
('Kantus', 'kantus', 'Danza musical ceremonial', 'Altiplano', 1),
('Potolos', 'potolos', 'Danza festiva', 'Chuquisaca', 1),
('Tobas', 'tobas', 'Danza guerrera', 'Oriente', 1),
('Chutas', 'chutas', 'Danza carnavalera', 'La Paz', 1),
('Auqui Auqui', 'auqui-auqui', 'Danza tradicional', 'La Paz', 1),
('Suri Sicuri', 'suri-sicuri', 'Danza con sikus', 'Altiplano', 1);

-- =========================
-- teachers
-- =========================
INSERT OR IGNORE INTO teachers (full_name, bio, is_active)
VALUES
('Fabiola Marquez Mamani', 'Profesora de danza folklórica', 1),
('Cristhian Fuente Villarroel', 'Instructor de danza', 1),
('Jhanneth Higuera Siles', 'Profesora de danza', 1),
('Yorgeli Ayaviri Vargas', 'Instructora de danza', 1),
('Israel Fuentes Villarroel', 'Profesor de danza', 1),
('Shanesia Ayaviri Vargas', 'Instructora de danza', 1),
('Erlinda Medrano Z.', 'Profesora de danza folklórica', 1);


-- =========================
-- level-dances
-- =========================
INSERT INTO level_dances (level_id, dance_id)
SELECT l.id, d.id
FROM levels l
JOIN dances d
WHERE d.slug IN (
  'cueca-cochabambina',
  'caporales',
  'tinku',
  'morenada',
  'salay',
  'taquirari'
)
AND NOT EXISTS (
  SELECT 1 FROM level_dances ld
  WHERE ld.level_id = l.id AND ld.dance_id = d.id
);

-- =========================
-- level_teachers
-- =========================
INSERT INTO level_teachers (level_id, teacher_id, role)
SELECT l.id, t.id, 'principal'
FROM levels l
JOIN teachers t
WHERE t.full_name IN (
  'Fabiola Marquez Mamani',
  'Cristhian Fuente Villarroel',
  'Jhanneth Higuera Siles'
)
AND NOT EXISTS (
  SELECT 1 FROM level_teachers lt
  WHERE lt.level_id = l.id AND lt.teacher_id = t.id
);
-- =========================
-- branch_contacts
-- =========================
-- ===============================
-- WHATSAPP
-- ===============================
INSERT INTO branch_contacts (
  branch_id,
  contact_type,
  label,
  value,
  url,
  sort_order,
  is_active
)
SELECT
  b.id,
  'whatsapp',
  'WhatsApp',
  '72265111',
  'https://wa.me/59172265111',
  1,
  1
FROM branches b;

-- ===============================
-- FACEBOOK
-- ===============================
INSERT INTO branch_contacts (
  branch_id,
  contact_type,
  label,
  url,
  sort_order,
  is_active
)
SELECT
  b.id,
  'facebook',
  'Facebook',
  'https://www.facebook.com/Ballettradicionesdemiterra/?locale=es_LA',
  2,
  1
FROM branches b;

-- ===============================
-- INSTAGRAM
-- ===============================
INSERT INTO branch_contacts (
  branch_id,
  contact_type,
  label,
  url,
  sort_order,
  is_active
)
SELECT
  b.id,
  'instagram',
  'Instagram',
  'https://www.instagram.com/bafott_ballet_folklorico/',
  3,
  1
FROM branches b;

-- ===============================
-- UBICACIÓN (GOOGLE MAPS)
-- ===============================
INSERT INTO branch_contacts (
  branch_id,
  contact_type,
  label,
  url,
  sort_order,
  is_active
)
SELECT
  b.id,
  'maps',
  'Ubicación',
  'https://share.google/nOFxvgBbg0QmCUJx5',
  4,
  1
FROM branches b;
