import api from './axios'

export async function fetchPackages() {
  const response = await api.get(
    '/api/packages'
  )

  return response.data.packages
}

export async function createPackage(data) {
  const response = await api.post(
    '/api/packages',
    data
  )

  return response.data.package
}

export async function togglePackageStatus(
  id,
  isActive
) {
  const response = await api.patch(
    `/api/packages/${id}/status`,
    {
      isActive,
    }
  )

  return response.data.package
}