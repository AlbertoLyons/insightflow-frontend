"use client";
import { useState, ChangeEvent } from 'react';
import { EditWorkspaceModel } from '@/src/models/workspaces/EditWorkspace'; 
import { editWorkspace } from '@/src/app/api/workspaces';

/**
 * Props para el componente EditWorkspace que representa la edición de un espacio de trabajo.
 */
type EditProps = { workspaceId: string, name?: string, imageUrl?: string };
/**
 * Componente que representa la edición de un espacio de trabajo.
 * Utiliza el lado del cliente de React.
 * @param {EditProps} props - Props que contienen el ID, nombre e imagen del espacio de trabajo a editar. 
 * @returns 
 */
export default function EditWorkspace({ workspaceId, name, imageUrl }: EditProps) {
  // Nombre del espacio de trabajo, obtiene el valor inicial de las props
  const [nameField, setNameField] = useState(name ?? '');
  // Imagen del espacio de trabajo, obtiene el valor inicial de las props
  const [imageField, setImageField] = useState<File | null>(null);
  // Vista previa de la imagen, obtiene el valor inicial de las props
  const [preview, setPreview] = useState<string | null>(imageUrl ?? null);
  /**
   * Maneja el cambio en el campo de imagen.
   * @param e Evento de cambio del input de tipo archivo.
   */
  const handleImageField = (e: ChangeEvent<HTMLInputElement>) => {
    // Obtener el archivo seleccionado
    const file = e.target.files?.[0] ?? null;
    // Si hay un archivo, actualizar el estado y generar una vista previa
    if (file) {
      setImageField(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string | null);
      };
      reader.readAsDataURL(file);
    }
  };
  /**
   * Función para subir los cambios del espacio de trabajo editado.
   * @returns Una promesa que se resuelve cuando la edición se completa.
   */
  async function uploadEditWorkspace() {
    // Validar que al menos el campo de nombre esté completo
    if (nameField == "") {
      alert('Por favor, complete al menos el campo de nombre.');
      return null;
    }
    // Crear el objeto de datos del espacio de trabajo editado 
    const workspaceData: EditWorkspaceModel = {
      name: nameField,
      image: imageField ? [imageField] : [],
    };
    // Intentar editar el espacio de trabajo y manejar errores
    try {
      await editWorkspace(workspaceId, workspaceData);
      alert('Espacio de trabajo modificado');
      // Recargar la página para reflejar los cambios
      window.location.reload()
    } catch (error) {
      alert('Error al modificar el espacio de trabajo');
    }
  }

  return (
    // Contenedor principal del modal de edición
    <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        color: "#333",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000
    }}>
      <div className="fields" style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "10px",
        width: "300px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "1rem"
        }}
        >
        <div style= {{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <h3 style={{ color: "#001b5aff", fontWeight: 'bold' }}>Modificar espacio de trabajo</h3>
            <button 
            // Cerrar el modal recargando la página
            onClick={() => window.location.reload()}
            style={{
            color: "white",
            backgroundColor: "#e74c3c",
            padding: "8px 12px",
            borderRadius: "8%",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            }}
            >
                ✕
            </button>
        </div>

        <div className="nameField" style={{
          display: 'flex',
          flexDirection: 'column', 
          alignItems: 'center',
          }}>
          <label style= {{ color: "#000000ff", fontStyle: 'bold', marginTop: '20px' }}>
            Nombre
          </label>
          <input style= {{ marginLeft: '10px', color: '#001b5aff', padding: '5px', borderRadius: '5px', border: '1px solid #001b5aff' }} 
            value={nameField}
            placeholder={name}
            // Actualizar el estado del nombre al cambiar el input
            onChange={(e) => setNameField(e.target.value)}
          />
        <div className="imageField" style={{
          display: 'flex',
          flexDirection: 'column', 
          alignItems: 'center',
          marginTop: '20px'
          }}>
          <input style= {{ 
            marginLeft: '20px', 
            display: 'none',
            }}
            type="file"
            accept="image/*"
            // Actualizar el estado de la imagen al cambiar el input
            onChange={handleImageField}
            id="image-input"
          />
          <label 
            htmlFor="image-input"
            style={{
              padding: '10px 20px',
              backgroundColor: '#427bffff',
              color: 'white',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: "16px",
              fontWeight: "bold",
              border: 'none'
            }}
          >
            Seleccionar imagen
          </label>
          {/* Mostrar la vista previa de la imagen si está disponible */}
          {preview && (
            <img src={preview} alt="Preview" style={{ maxWidth: '100px', marginTop: '30px' }} />
          )}
        </div>
        <button
              style={{
                  marginTop: '30px',
                  color: "white",
                  backgroundColor: "#1f9b00ff", 
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "20px",
                  marginBottom: '30px'
              }}
              // Llamar a la función para subir los cambios al hacer clic
              onClick={() => uploadEditWorkspace()}
              >
              Editar
        </button>
      </div>
      </div>
    </div>
  );
}