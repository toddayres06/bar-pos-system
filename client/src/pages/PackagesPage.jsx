import {
  useEffect,
  useState,
} from 'react'

import PackageForm from '../components/PackageForm'

import {
  fetchPackages,
  createPackage,
  togglePackageStatus,
} from '../api/packages'

export default function PackagesPage() {
  const [packages, setPackages] =
    useState([])

  const [loading, setLoading] =
    useState(false)

  async function loadPackages() {
    try {
      const data =
        await fetchPackages()

      setPackages(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    loadPackages()
  }, [])

  async function handleCreatePackage(
    formData
  ) {
    try {
      setLoading(true)

      const newPackage =
        await createPackage(formData)

      setPackages((prev) => [
        newPackage,
        ...prev,
      ])
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  async function handleToggleStatus(
  id,
  currentStatus
) {
  try {
    const updatedPackage =
      await togglePackageStatus(
        id,
        !currentStatus
      )

    setPackages((prev) =>
      prev.map((pkg) =>
        pkg.id === id
          ? updatedPackage
          : pkg
      )
    )
  } catch (error) {
    console.error(error)
  }
}

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Packages
        </h1>

        <p className="text-slate-500 mt-1">
          Manage pricing tiers and
          service offerings.
        </p>
      </div>

      {/* FORM */}
      <PackageForm
        onSubmit={handleCreatePackage}
        loading={loading}
      />

      {/* PACKAGE LIST */}
      <div className="grid gap-4">

        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-white border rounded-xl p-5 shadow-sm"
          >

            <div className="flex justify-between items-start">

              <div>
                <h2 className="text-xl font-semibold text-slate-800">
                  {pkg.name}
                </h2>

                <p className="text-slate-500 mt-1">
                  {pkg.description}
                </p>
              </div>

              <div className="text-right">
                <p className="text-2xl font-bold text-slate-800">
                  $
                  {pkg.price.toLocaleString()}
                </p>

                <p className="text-xs text-slate-400 mt-1">
                  {pkg.isActive
                    ? 'Active'
                    : 'Inactive'}
                </p>
                <button
                  onClick={() =>
                    handleToggleStatus(
                      pkg.id,
                      pkg.isActive
                    )
                  }
                  className={`mt-3 text-xs px-3 py-1 rounded transition ${
                    pkg.isActive
                      ? 'bg-red-100 text-red-700 hover:bg-red-200'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {pkg.isActive
                    ? 'Deactivate'
                    : 'Activate'}
                </button>
              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  )
}