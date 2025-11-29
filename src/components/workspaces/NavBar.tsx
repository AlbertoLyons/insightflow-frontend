import Link from 'next/link';

export default async function NavBar() {
  return (
      <div style={{ 
    textAlign: 'center', 
    padding: '10px', 
    backgroundColor: '#001b5aff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
    }}>
    <h1 style={{ color: 'white', margin: 0, fontSize: 20 }}>Tu listado de espacios</h1>
    <div style={{ 
      display: 'flex', 
      gap: '20px', 
      listStyle: 'none', 
      margin: 0, 
      padding: 0,
    }}>
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
            transition: 'all 0.3s'
          }}
        >
          Inicio
        </Link> 
      </li>
      <li>
        <Link 
          href="/workspace/create"
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
          Crear espacio de trabajo
        </Link> 
      </li>
    </div>
  </div>
  );
}