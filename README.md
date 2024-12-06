frontend/
├── src/
│   ├── app/                  # Carpeta de enrutamiento (App Router de Next.js)
│   │   ├── page.tsx          # Página principal
│   │   ├── layout.tsx        # Componente de diseño global
│   │   ├── error.tsx         # Componente de manejo de errores
│   │   ├── loading.tsx       # Componente de carga
│   │   ├── about/            # Rutas anidadas
│   │   │   └── page.tsx      # Página de la ruta /about
│   │   └── ...               # Otras rutas
│   ├── components/           # Componentes reutilizables de la interfaz de usuario
│   ├── features/             # Funcionalidades específicas (ej., autenticación, gestión de usuarios)
│   │   ├── auth/             # Módulo de autenticación
│   │   │   ├── components/   # Componentes relacionados con autenticación
│   │   │   ├── services/     # Lógica de negocio y servicios de autenticación
│   │   │   └── utils/        # Funciones auxiliares
│   │   └── ...               # Otros módulos de funcionalidad
│   ├── hooks/                # Hooks personalizados
│   ├── lib/                  # Funciones auxiliares, utilidades y helpers
│   ├── models/               # Modelos de datos y tipos TypeScript
│   ├── pages/                # Páginas para el enrutamiento tradicional (puede quedar vacío con App Router)
│   ├── public/               # Archivos estáticos
│   ├── styles/               # Archivos de estilos globales y específicos
│   └── utils/                # Funciones y utilidades generales
├── .gitignore                # Archivo para ignorar archivos/directorios en git
├── next.config.js            # Archivo de configuración de Next.js
├── package.json              # Archivo de configuración de npm/yarn
└── README.md                 # Documentación