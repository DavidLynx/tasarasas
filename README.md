# 📦 TASARA — Web Platform

Documento Técnico + Branding Interno

## 🌍 Overview

TASARA es una plataforma digital para la comercialización de productos agroindustriales colombianos, con un enfoque en calidad, origen y diseño contemporáneo.

El sitio web no es únicamente una tienda:
es una herramienta de posicionamiento de marca + sistema de venta + narrativa de origen.

Actualmente, el producto activo es:

👉 **Café Leonor** — línea de café de especialidad con identidad propia.

## 🎯 Propósito del Proyecto

Construir una plataforma que:

- Venda productos
- Cuente historias reales
- Genere confianza
- Sea escalable a múltiples líneas agroindustriales

## 🧠 Principios de Marca

1. TASARA ≠ café

   TASARA es una marca madre.

   Café Leonor es solo el inicio.

2. Diseño como diferenciador

   No competimos solo en producto, sino en:
   - Presentación
   - Experiencia visual
   - Claridad

3. Origen con intención

   No es storytelling vacío.

   Es:
   - Territorio
   - Personas
   - Proceso

## 🏗️ Arquitectura del Proyecto

```
/tasara-web
│
├── index.html          # Página principal (marca TASARA)
├── cafe-leonor.html    # Página producto (deep dive)
├── tienda.html         # Catálogo / venta
├── origen.html         # Trazabilidad / lotes
│
├── css/
│   └── style.css
│
├── js/
│   └── main.js
│
├── vendor/
│   ├── gsap.min.js
│   └── ScrollTrigger.min.js
│
├── assets/
│
└── README.md
```

## ⚙️ Stack Tecnológico

- HTML5
- CSS3 (custom)
- JavaScript (vanilla)
- GSAP (animación)

## ⚠️ Estado Actual del Proyecto

Problemas detectados

1. Errores JS / GSAP
   - Tracking prevention blocked access to storage
   - `scrollTo` mal implementado
2. Problemas UX
   - Demasiadas animaciones
   - Saturación visual
   - Jerarquía confusa
3. Problemas de contenido
   - Copies débiles
   - Repetición visual (empaque)
   - Falta de narrativa de marca

## 🧩 Filosofía de Desarrollo

🔴 Regla principal:

Si no aporta claridad, se elimina.

Prioridades:

- Claridad > animación
- Marca > producto
- Experiencia > estética

## 🎨 Sistema Visual

Base

- Negro profundo → autoridad
- Dorado → calidad
- Acentos modernos
- Verde → agro / café verde
- Azul → institucional
- Otros tonos vivos → diferenciación

Componentes clave

- Píldoras (títulos / categorías)
- Íconos circulares
- Cards modulares
- Espacio (aire visual)

## ✍️ Sistema de Copywriting

❌ Prohibido

- “Marca lista para fotos”
- Frases genéricas
- Repetir lo que ya muestra la imagen

✅ Obligatorio

- Storytelling real
- Claridad inmediata
- Lenguaje simple pero elegante
- Beneficio concreto
- Tono de marca: cercano pero premium; seguro, no exagerado; humano, no corporativo

## ☕ Café Leonor — Submarca

Rol dentro del sistema

- Producto principal actual
- Punto de entrada a TASARA
- Ejemplo del estándar de calidad

Problemas actuales (archivo `cafe-leonor.html`)

- Demasiadas imágenes del empaque
- Historia del nombre ausente
- Logo sin explicación
- Copy redundante
- CTAs débiles

Café Leonor debe comunicar:

- Homenaje (mujer cafetera)
- Identidad visual clara
- Experiencia simple pero cuidada

## 🧠 Concepto de Marca

- TASARA: Plataforma · Moderna · Escalable · Flexible
- Café Leonor: Humana · Cercana · Elegante · Narrativa

## 🧪 Lineamientos UX

❌ Evitar

- Scroll infinito sin estructura
- Animaciones pesadas
- Repetición visual

✅ Implementar

- Secciones claras
- Jerarquía fuerte
- Lectura rápida
- Interacciones simples

## 🚀 Roadmap

- Fase 1 — Base sólida
  - Limpiar código
  - Corregir errores JS
  - Mejorar copy
- Fase 2 — Experiencia
  - Animaciones ligeras
  - Mejor interacción
  - Optimización visual
- Fase 3 — Escalabilidad
  - Nuevos productos
  - Sistema de trazabilidad completo
  - Backend / pagos

## 🧑‍💻 Guía para Codex / Desarrollo

Cambios prioritarios

- Reducir dependencia de GSAP
- Simplificar animaciones
- Reescribir todos los textos
- Eliminar imágenes repetidas
- Reestructurar Café Leonor como narrativa

Reglas de implementación

- No duplicar contenido visual
- No saturar secciones
- Mantener consistencia visual
- Priorizar rendimiento

## 📈 Objetivos del Sitio

Convertir visitantes en:

- Clientes
- Compradores recurrentes
- Aliados comerciales
- Seguidores de marca

## 📞 Contacto

TASARA SAS
Colombia

📧 tasara.colombia@gmail.com

📱 WhatsApp: +57 305 4402 145

## 🧩 Nota Estratégica Final

Este proyecto no es una página web.

Es el inicio de una marca.

Regla absoluta:

Cada decisión debe hacer que TASARA se vea más clara, más fuerte y más escalable.
