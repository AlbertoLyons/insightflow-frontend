
import Link from 'next/link';

export default function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Inicio</Link> 
        </li>
        <li>
          <Link href="/workspace">Mish</Link> 
        </li>
        <li>
          <Link href="/acerca">Acerca de</Link>
        </li>
      </ul>
    </nav>
  );
}