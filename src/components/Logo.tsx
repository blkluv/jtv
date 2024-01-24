import logo from 'assets/logo.webp';

interface ILogoProps {
  title: string;
  width?: number;
}

export default function Logo(props: ILogoProps) {
  const { title, width } = props;
  return <img src={logo} alt={title} width={width} />;
}
