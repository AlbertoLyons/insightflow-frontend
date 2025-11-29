"use client";
import { useState, ChangeEvent } from 'react';
import { EditWorkspaceModel } from '@/src/models/workspaces/EditWorkspace'; 
import { useRouter } from "next/navigation";
import { editWorkspace } from '@/src/app/api/workspaces';

type EditProps = { workspaceId: string, name?: string, imageUrl?: string };

export default function EditWorkspace({ workspaceId, name, imageUrl }: EditProps) {
  const [nameField, setNameField] = useState(name ?? '');
  const [imageField, setImageField] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(imageUrl ?? null);
  const router = useRouter();
  console.log("Editing workspace with ID:", workspaceId);
  console.log("Initial name:", name);
  console.log("Initial imageUrl:", imageUrl);
  
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
  async function uploadEditWorkspace() {
    if (!imageField && nameField == "") {
      alert('Por favor, complete alguno de los campos.');
      return null;
    } 
    const workspaceData: EditWorkspaceModel = {
      name: nameField,
      image: imageField ? [imageField] : [],
    };
    try {
      await editWorkspace(workspaceId, workspaceData);
      alert('Espacio de trabajo modificado');
      window.location.reload()
    } catch (error) {
      console.error('Error editing workspace:', error);
      alert('Error al modificar el espacio de trabajo');
    }
  }

  return (
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
              onClick={() => uploadEditWorkspace()}
              >
              Editar
        </button>
      </div>
      </div>
    </div>
  );
}