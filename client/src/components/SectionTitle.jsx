export default function SectionTitle({ title, subtitle }) {
  return (
    <div className="max-w-7xl mx-auto px-6 mt-10 mb-4">
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
    </div>
  );
}
