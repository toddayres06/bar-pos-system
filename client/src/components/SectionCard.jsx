export default function SectionCard({
  title,
  children,
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-800">
          {title}
        </h2>
      </div>

      {children}
    </div>
  )
}