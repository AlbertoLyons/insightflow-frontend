"use client";
import Link from 'next/link';
import { useState, ChangeEvent } from 'react';
import { createWorkspace } from '../../api/workspaces';
import { CreateWorkspace } from '@/src/models/workspaces/CreateWorkspace';
import { useRouter } from "next/navigation";

/**
 * Componente de la página para crear un espacio de trabajo.
 * @returns {JSX.Element} Elemento JSX que representa la página para crear un espacio de trabajo.
 */
export default function Navigation() {
  // Estados para los campos del formulario
  const [nameField, setNameField] = useState('');
  const [descriptionField, setDescriptionField] = useState('');
  const [topicField, setTopicField] = useState('');
  const [imageField, setImageField] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  /**
   * TODO: Reemplazar valores hardcodeados por datos del usuario logueado
   */
  const ownerName = "Juan Pérez";
  const ownerId = "cff73587-b2d5-4c98-9790-8b328ce0fb73"; 
  /**
   * TODO: Reemplazar ownerId hardcodeado por el id del usuario logueado
   */
  // Hook para la navegación
  const router = useRouter();
  /**
   * Función para manejar el cambio en el campo de imagen.
   * @param e Evento de cambio en el input de tipo archivo
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
   * Función para subir el nuevo espacio de trabajo.
   * @returns Una promesa que se resuelve cuando la creación se completa.
   */
  async function uploadWorkspace() {
    // Validar que todos los campos estén completos
    if (!imageField || nameField == "" || descriptionField == "" || topicField == "") {
      alert('Por favor, complete todos los campos.');
      return null;
    } 
    // Crear el objeto de datos del nuevo espacio de trabajo
    const workspaceData: CreateWorkspace = {
      name: nameField,
      description: descriptionField,
      topic: topicField,
      image: [imageField],
      ownerId: ownerId,
      ownerName: ownerName
    };
    // Intentar crear el espacio de trabajo y manejar errores
    try {
      await createWorkspace(workspaceData);
      alert('Espacio de trabajo creado con éxito');
      // Redirigir a la página de espacios de trabajo en caso de éxito
      router.push('/workspace');
    } catch (error) {
      console.error('Error creating workspace:', error);
      alert('Error al crear el espacio de trabajo');
    }
  }

  return (
    // Contenedor principal de la página
    <main style= {{
      backgroundColor: '#fff',
    }}>
      <div style={{ 
        textAlign: 'center', 
        padding: '10px', 
        backgroundColor: '#001b5aff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <h1 style={{ color: 'white', margin: 0, fontSize: 20 }}>Crear espacio de trabajo</h1>
          <div style={{ display: 'flex', gap: '20px', listStyle: 'none', margin: 0, padding: 0 }}>
            <li>
              <Link 
                href="/" 
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#ffffff',
                  color: '#001b5aff',
                  textDecoration: 'none',
                  borderRadius: '5px',
                  fontWeight: '600',
                }}
              >
                Inicio
              </Link> 
            </li>
            <li>
              <Link 
                href="/workspace"
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#ffffff',
                  color: '#001b5aff',
                  textDecoration: 'none',
                  borderRadius: '5px',
                  fontWeight: '600',
                  transition: 'all 0.3s'
                }}
              >
                Ver espacios de trabajos
              </Link> 
            </li>
          </div>
      </div>
      <div className="fields" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
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
            // Actualizar el estado del campo nombre al cambiar
            onChange={(e) => setNameField(e.target.value)}
          />
        </div>
        <div className="descriptionField" style={{
          display: 'flex',
          flexDirection: 'column', 
          alignItems: 'center',
          }}>
          <label style= {{ color: "#000000ff", fontStyle: 'bold', marginTop: '20px' }}>
            Descripción
          </label>
          <input style= {{ marginLeft: '10px', color: '#001b5aff', padding: '5px', borderRadius: '5px', border: '1px solid #001b5aff' }} 
            value={descriptionField}
            // Actualizar el estado del campo descripción al cambiar
            onChange={(e) => setDescriptionField(e.target.value)}
          />
        </div>
        <div className="topicField" style={{
          display: 'flex',
          flexDirection: 'column', 
          alignItems: 'center',
          }}>
          <label style= {{ color: "#000000ff", fontStyle: 'bold', marginTop: '20px' }}>
            Temática
          </label>
          <input style= {{ marginLeft: '10px', color: '#001b5aff', padding: '5px', borderRadius: '5px', border: '1px solid #001b5aff' }} 
            value={topicField}
            // Actualizar el estado del campo temática al cambiar
            onChange={(e) => setTopicField(e.target.value)}
          />
        </div>
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
          {/* Vista previa de la imagen seleccionada */}
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
              // Llamar a la función para subir el espacio de trabajo al hacer clic
              onClick={() => uploadWorkspace()}
              >
              Crear espacio de trabajo
        </button>
      </div>
    </main>
  );
}