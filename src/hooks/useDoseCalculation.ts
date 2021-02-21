import { Exam } from 'src/defs'

/**
 * @param exam Examen prodigué (isotope + x)
 * @param injectionTime Heure d'administration (valeur en ms depuis minuit)
 * @param startTime  Heure de début de prise en charge (valeur en ms depuis minuit)
 * @param duration Durée de la prise en charge en minutes
 * @param activity Activité de la source en MBq
 * @param distance Distance au patient en cm
 */
export function useDoseCalculation(
  exam: Exam | null,
  injectionTime: number,
  startTime: number,
  duration: number,
  activity: number,
  distance: number
) {
  if (
    !exam ||
    Number.isNaN(injectionTime) ||
    Number.isNaN(startTime) ||
    Number.isNaN(duration) ||
    Number.isNaN(activity) ||
    Number.isNaN(distance)
  ) {
    return undefined
  }
  const hl = exam.isotope.halfLife
  const deltaT1 = (startTime - injectionTime) / 3600_000 // ms -> hours
  const ddr = exam.x * activity
  const ddp = ddr * Math.exp((-Math.LN2 * deltaT1) / hl) * (50 / distance) ** 2
  const deltaT2 = duration / 60 // minutes -> hours
  const dose =
    (-1 / Math.LN2) * ddp * hl * (Math.exp((-Math.LN2 * deltaT2) / hl) - 1)
  // console.dir({
  //   inputs: { exam, injectionTime, startTime, duration, activity, distance },
  //   hl,
  //   deltaT1,
  //   ddr,
  //   ddp,
  //   deltaT2,
  //   dose
  // })
  return dose
}
