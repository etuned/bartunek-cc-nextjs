import PicoSanity from 'picosanity'

export const client = new PicoSanity({
  projectId: 'nk528ugs',
  dataset: 'production',
  apiVersion: '2021-10-21', // use a UTC date string
  useCdn: true,
})
