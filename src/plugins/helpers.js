export function resolveProjectStatusVariant(stat) {
  if (stat === 'Schedulled')
    return { status:'Non Demarré', color:'secondary' }
  if (stat === 'In Progress')
    return { status:'En Cours', color:'info' }
  if (stat === 'Stopped')
    return { status:'Suspendu', color:'warning' }
  if (stat === 'Failled')
    return { status:'Echec', color:'error' }
  if (stat === 'Finished')
    return { status:'Terminé', color:'success' }
}

export function resolveLocalDateVariant (d) {
  const date = new Date(d)
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  
  return date.toLocaleDateString('fr-FR', options)
}
