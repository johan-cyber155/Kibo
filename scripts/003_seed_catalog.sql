-- Seed KIBO product catalog and subscription plans

-- ============ PRODUCTS ============
insert into public.products (slug, name, category, description, price_pen, specs, badge, badge_variant, icon, color, sort_order)
values
  ('rtx-5090', 'NVIDIA GeForce RTX 5090', 'gpu',
   'El buque insignia de NVIDIA. 32 GB GDDR7, arquitectura Blackwell. Ideal para render 3D, modelado BIM y IA generativa.',
   349, array['32 GB GDDR7','Blackwell','DLSS 4'], 'Nuevo', 'new', '🎮', '#76b900', 10),

  ('rtx-5080', 'NVIDIA GeForce RTX 5080', 'gpu',
   'Potencia extrema con 16 GB GDDR7. Perfecta para diseño CAD, arquitectura y producción audiovisual profesional.',
   249, array['16 GB GDDR7','Blackwell','DLSS 4'], 'Popular', 'hot', '⚡', '#7c5cfc', 20),

  ('rtx-5070-ti', 'NVIDIA GeForce RTX 5070 Ti', 'gpu',
   'Equilibrio ideal entre rendimiento y costo. 12 GB GDDR7 para profesionales exigentes y gamers avanzados.',
   189, array['12 GB GDDR7','Blackwell'], null, 'new', '🚀', '#10d9a0', 30),

  ('rtx-5060', 'NVIDIA GeForce RTX 5060', 'gpu',
   'Entry level de última generación. 8 GB GDDR7, perfecta para diseñadores y profesionales que inician en IA.',
   119, array['8 GB GDDR7','Blackwell'], 'Recomendado', 'hot', '💻', '#f0b429', 40),

  ('meta-orion-ar-pro', 'Meta Orion AR Pro', 'ar',
   'Realidad aumentada avanzada con IA integrada. Soporte técnico remoto en tiempo real, control gestual y pantalla holográfica 4K.',
   289, array['Holográfico 4K','Snapdragon AR2'], 'Premium', 'premium', '🥽', '#a78bfa', 50),

  ('apple-vision-air', 'Apple Vision Air', 'ar',
   'Experiencia inmersiva ultraligera con visionOS. Ideal para arquitectura, diseño y colaboración remota con clientes.',
   399, array['M4 Chip','EyeSight','Spatial Audio'], 'Nuevo', 'new', '👓', '#c084fc', 60),

  ('rayban-meta-smart-ai', 'RayBan Meta Smart AI', 'ar',
   'El equilibrio perfecto entre funcionalidad y estética. IA conversacional, cámara 36MP y soporte técnico inteligente.',
   149, array['IA Conversacional','36MP Cam','12h battery'], null, 'new', '🔮', '#f0b429', 70),

  ('hp-designjet-z9', 'HP DesignJet Z9+', 'print',
   'Impresión de gran formato hasta A0 con precisión de 2400 dpi. Ideal para planos de arquitectura e ingeniería civil.',
   219, array['2400 DPI','Gran Formato','PostScript'], 'Top Ventas', 'hot', '🖨️', '#4a9aff', 80),

  ('epson-surecolor-p9570', 'Epson SureColor P9570', 'print',
   'Impresión fotográfica y gráfica de nivel profesional. 12 tintas UltraChrome Pro con gestión de color ICC avanzada.',
   179, array['12 tintas','44 pulgadas','Color ICC'], null, 'new', '🎨', '#ff9955', 90),

  ('bambu-lab-x1-carbon', 'Bambu Lab X1 Carbon', 'print',
   'Impresión 3D multicolor de alta velocidad. Perfecta para prototipos de construcción, maquetas y piezas de ingeniería.',
   139, array['Multi-color','500mm/s','AMS Lite'], 'Nuevo', 'new', '🏗️', '#10d9a0', 100)
on conflict (slug) do update set
  name = excluded.name,
  category = excluded.category,
  description = excluded.description,
  price_pen = excluded.price_pen,
  specs = excluded.specs,
  badge = excluded.badge,
  badge_variant = excluded.badge_variant,
  icon = excluded.icon,
  color = excluded.color,
  sort_order = excluded.sort_order;

-- ============ SUBSCRIPTION PLANS ============
insert into public.subscription_plans (slug, name, subtitle, price_pen, features, icon, featured, sort_order)
values
  ('starter', 'Starter', 'Para freelancers y estudiantes', 99,
   array[
     '1 equipo de gama media',
     'Soporte técnico básico (48h)',
     'Actualización cada 18 meses',
     'Gestión vía app móvil',
     'Garantía incluida'
   ], '🌱', false, 10),

  ('pro', 'Pro', 'Para profesionales y PYMEs', 249,
   array[
     'Hasta 3 equipos de alta gama',
     'Soporte técnico prioritario (4h)',
     'Actualización cada 12 meses',
     'Gestión avanzada + métricas',
     'Garantía + seguro de equipo',
     'Asistencia remota con lentes IA'
   ], '🚀', true, 20),

  ('enterprise', 'Enterprise', 'Para empresas y grandes equipos', 599,
   array[
     'Equipos ilimitados',
     'Soporte 24/7 dedicado',
     'Actualización cada 6 meses',
     'Dashboard empresarial completo',
     'Integración con ERP/BIM',
     'Capacitación para el equipo',
     'SLA garantizado al 99.9%'
   ], '🏢', false, 30)
on conflict (slug) do update set
  name = excluded.name,
  subtitle = excluded.subtitle,
  price_pen = excluded.price_pen,
  features = excluded.features,
  icon = excluded.icon,
  featured = excluded.featured,
  sort_order = excluded.sort_order;
