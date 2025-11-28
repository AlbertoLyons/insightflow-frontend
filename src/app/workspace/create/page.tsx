"use client";
import Link from 'next/link';
import { useState, ChangeEvent } from 'react';
import { createWorkspace } from '../../api/workspaces';
import { CreateWorkspace } from '@/src/models/CreateWorkspace';
import { useRouter } from "next/navigation";

export default function Navigation() {
  const [nameField, setNameField] = useState('');
  const [descriptionField, setDescriptionField] = useState('');
  const [topicField, setTopicField] = useState('');
  const [imageField, setImageField] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  // Hardcodeado para pruebas
  const ownerName = "Juan Pérez";
  const ownerId = "b3850a65-61d9-4417-8b03-de3a700d7064"; 
  // Despues se debe de cambiar por el id del usuario logueado
  const router = useRouter();
  
  const handleImageField = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      setImageField(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string | null);
      };
      reader.readAsDataURL(file);
    }
  };
  async function uploadWorkspace() {
    if (!imageField || nameField == "" || descriptionField == "" || topicField == "") {
      alert('Por favor, complete todos los campos.');
      return null;
    } 
    const workspaceData: CreateWorkspace = {
      name: nameField,
      description: descriptionField,
      topic: topicField,
      image: [imageField],
      ownerId: ownerId,
      ownerName: ownerName
    };
    try {
      await createWorkspace(workspaceData);
      alert('Espacio de trabajo creado con éxito');
      router.push('/workspace');
    } catch (error) {
      console.error('Error creating workspace:', error);
      alert('Error al crear el espacio de trabajo');
    }
  }

  return (
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
          {preview && (
            <img src={preview} alt="Preview" style={{ maxWidth: '100px' }} />
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
              onClick={() => uploadWorkspace()}
              >
              Crear espacio de trabajo
        </button>
      </div>
    </main>
  );
}