export interface Isotope {
  symbol: string
  exponent: string
  Te: number
}

export type Isotopes = 'Tc99m' | 'F18' | 'I123' | 'Ga68' | 'Tl201'

export const isotopes: Record<Isotopes, Isotope> = {
  Tc99m: { symbol: 'Tc', exponent: '99m', Te: 6.02 },
  F18: { symbol: 'F', exponent: '18', Te: 1.83 },
  I123: { symbol: 'I', exponent: '123', Te: 13.2 },
  Ga68: { symbol: 'Ga', exponent: '68', Te: 1.13 },
  Tl201: { symbol: 'Tl', exponent: '201', Te: 72.93 }
}

// --

export interface Exam {
  isotope: Isotope
  x: number
}

export type Exams =
  | 'osseusePrecoce'
  | 'osseuseTardive'
  | 'parathyroide'
  | 'thyroideTechnetiumLibre'
  | 'fractionEjectionVentriculaireGauche'
  | 'cardiologieMIBI'
  | 'choline'
  | 'fdg'
  | 'datscan'
  | 'thyroideIode'
  | 'psma'
  | 'dotatoc'
  | 'cardiologieThallium'

export const exams: Record<Exams, Exam> = {
  osseusePrecoce: {
    isotope: isotopes.Tc99m,
    x: 0.03831046
  },
  osseuseTardive: {
    isotope: isotopes.Tc99m,
    x: 0.024105275
  },
  parathyroide: {
    isotope: isotopes.Tc99m,
    x: 0.04926209
  },
  thyroideTechnetiumLibre: {
    isotope: isotopes.Tc99m,
    x: 0 // todo: TBD
  },
  fractionEjectionVentriculaireGauche: {
    isotope: isotopes.Tc99m,
    x: 0.0422045
  },
  cardiologieMIBI: {
    isotope: isotopes.Tc99m,
    x: 0 // todo: TBD
  },
  choline: {
    isotope: isotopes.F18,
    x: 0.18605764
  },
  fdg: {
    isotope: isotopes.F18,
    x: 0.228885008
  },
  datscan: {
    isotope: isotopes.I123,
    x: 0.041781459
  },
  thyroideIode: {
    isotope: isotopes.I123,
    x: 0 // todo: TBD
  },
  psma: {
    isotope: isotopes.Ga68,
    x: 0 // todo: TBD
  },
  dotatoc: {
    isotope: isotopes.Ga68,
    x: 0.268963267
  },
  cardiologieThallium: {
    isotope: isotopes.Tl201,
    x: 0.033019412
  }
}
