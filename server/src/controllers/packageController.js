import {
  getPackages,
  createPackage,
  updatePackage,
  togglePackageStatus,
  archivePackage,
} from '../services/packageService.js'

export async function getPackagesHandler(
  req,
  res
) {
  try {
    const packages =
      await getPackages()

    res.status(200).json({
      success: true,
      packages,
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Failed to fetch packages',
    })
  }
}

export async function createPackageHandler(
  req,
  res
) {
  try {
    const pkg =
      await createPackage(req.body)

    res.status(201).json({
      success: true,
      package: pkg,
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Failed to create package',
    })
  }
}

export async function updatePackageHandler(
  req,
  res
) {
  try {
    const updatedPackage =
      await updatePackage(
        req.params.id,
        req.body
      )

    res.status(200).json({
      success: true,
      package: updatedPackage,
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Failed to update package',
    })
  }
}

export async function togglePackageStatusHandler(
  req,
  res
) {
  try {
    const updatedPackage =
      await togglePackageStatus(
        req.params.id,
        req.body.isActive
      )

    res.status(200).json({
      success: true,
      package: updatedPackage,
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message:
        'Failed to update package status',
    })
  }
}

export async function archivePackageHandler(req, res) {
  try {
    const pkg = await archivePackage(req.params.id)

    res.status(200).json({
      success: true,
      package: pkg,
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Failed to archive package',
    })
  }
}