export default function DashboardCard({
  title,
  value,
  subtitle,
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-5">
      <p className="text-sm text-slate-500 mb-2">
        {title}
      </p>

      <h3 className="text-3xl font-bold text-slate-800">
        {value}
      </h3>

      <p className="text-sm text-slate-400 mt-2">
        {subtitle}
      </p>
    </div>
  )
}