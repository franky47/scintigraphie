import { Exam } from 'src/defs'

/**
 * @param exam Examen prodigué (isotope + x)
 * @param startTime Heure d'administration (valeur en ms depuis minuit)
 * @param endTime  Heure de début de prise en charge (valeur en ms depuis minuit)
 * @param duration Durée de la prise en charge en minutes
 * @param activity Activité de la source en MBq
 */
export function useDoseCalculation(
  exam: Exam | null,
  startTime: number,
  endTime: number,
  duration: number,
  activity: number
) {
  if (
    !exam ||
    Number.isNaN(startTime) ||
    Number.isNaN(endTime) ||
    Number.isNaN(duration) ||
    Number.isNaN(activity)
  ) {
    return undefined
  }
  const hl = exam.isotope.halfLife
  const deltaT1 = (endTime - startTime) / 3600_000 // ms -> hours
  const ddr = exam.x * activity
  const ddp = ddr * Math.exp((Math.LN2 * deltaT1) / hl)
  const deltaT2 = duration / 60 // minutes -> hours
  const dose =
    (-1 / Math.LN2) * ddp * hl * (Math.exp((-Math.LN2 * deltaT2) / hl) - 1)
  // console.dir({
  //   exam,
  //   hl,
  //   deltaT1,
  //   ddr,
  //   ddp,
  //   deltaT2,
  //   dose
  // })
  return dose
}
