export default function TitleHeader({ title }) {
  return (
    <div className="border-b-2 border-theme-base flex items-center pl-12 py-8">
      <h1 className="font-bold text-4xl text-theme-base">{title}</h1>
    </div>
  );
}
