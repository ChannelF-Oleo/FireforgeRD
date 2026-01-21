# 🎯 Hooks para Focus Trap y Modales

## 📋 Descripción

Conjunto de hooks personalizados para manejar focus trap en modales y componentes overlay, asegurando una experiencia accesible y profesional.

## 🔧 Hooks Disponibles

### `useFocusTrap`

Hook principal para implementar focus trap en cualquier elemento contenedor.

```typescript
import { useFocusTrap } from '@/hooks/useFocusTrap';

function MyModal({ isOpen, onClose }) {
  const modalRef = useFocusTrap({
    isActive: isOpen,
    initialFocus: true,    // 