/* Shared presentation metadata. Does not alter the validated medical corpus. */
(function(root){
  'use strict';
  const titles={
    'double-prise-medicament':'Médicament pris deux fois par erreur : que faire ?',
    'sciatique-irm-quand':'Sciatique : quand faut-il faire une IRM ?',
    'nycturie-levers-nocturnes-uriner':'Se lever la nuit pour uriner : causes de la nycturie',
    'saignement-apres-menopause':'Saignements après la ménopause : pourquoi consulter ?'
  };
  const approvedRevisionMetadata={
  "activite-physique-sommeil-20260824": {
    "id": "activite-physique-sommeil-20260824",
    "title": "Activité physique et sommeil : bénéfices et limites",
    "description": "Bouger régulièrement peut améliorer le sommeil. Quels exercices choisir, à quel moment et quand rechercher une insomnie ou une apnée ?"
  },
  "double-prise-medicament": {
    "id": "double-prise-medicament",
    "title": "Médicament pris deux fois : que faire immédiatement ?",
    "description": "Double prise accidentelle : qui appeler, quelles informations préparer et pourquoi la prochaine dose dépend du médicament et de votre situation."
  },
  "rupture-medicament-que-faire": {
    "id": "rupture-medicament-que-faire",
    "title": "Médicament en rupture : comment poursuivre son traitement ?",
    "description": "Votre pharmacie n’a plus votre traitement : démarches, alternatives encadrées et précautions pour éviter une interruption ou une erreur de dose."
  },
  "cancer-oncogenetique-famille": {
    "id": "cancer-oncogenetique-famille",
    "title": "Cancer familial : quand consulter en oncogénétique ?",
    "description": "Quels antécédents préparer, qui tester en premier et comment comprendre un résultat positif, négatif ou incertain en oncogénétique ?"
  },
  "cancer-metastases-definition": {
    "id": "cancer-metastases-definition",
    "title": "Métastases : comprendre le diagnostic et la prise en charge",
    "description": "Une métastase reste liée au cancer d’origine. Comprendre le bilan, les traitements possibles et les questions à poser à l’équipe médicale."
  },
  "audition-apres-60-ans": {
    "id": "audition-apres-60-ans",
    "title": "Audition après 60 ans : signes et parcours du bilan",
    "description": "Difficultés dans le bruit, télévision plus forte : quand faire un bilan auditif, à quoi servent les tests et quels bénéfices attendre d’un appareil ?"
  },
  "saignement-apres-menopause": {
    "id": "saignement-apres-menopause",
    "title": "Saignement après la ménopause : quand consulter ?",
    "description": "Quelques traces, pertes rosées ou saignement après un rapport : pourquoi consulter après la ménopause et comment se déroule le bilan."
  },
  "confusion-aigue-personne-agee": {
    "id": "confusion-aigue-personne-agee",
    "title": "Confusion soudaine chez une personne âgée : que faire ?",
    "description": "Désorientation, agitation ou ralentissement apparus en quelques heures : reconnaître une confusion aiguë et organiser une évaluation urgente."
  },
  "enfant-parle-peu-quand-sinquieter": {
    "id": "enfant-parle-peu-quand-sinquieter",
    "title": "Enfant qui parle peu : repères et bilan du langage",
    "description": "Absence de mots, peu de phrases ou compréhension difficile : quels repères suivre, quand consulter et pourquoi vérifier l’audition ?"
  },
  "nycturie-levers-nocturnes-uriner": {
    "id": "nycturie-levers-nocturnes-uriner",
    "title": "Uriner plusieurs fois la nuit : causes et démarches",
    "description": "La nycturie ne vient pas toujours de la prostate. Calendrier sur trois jours, causes possibles, gestes utiles et situations qui doivent alerter."
  }
};
  function title(card){return approvedRevisionMetadata[card.id]?.title||titles[card.id]||card.title||card.question||'Question santé';}
  const descriptions={
    'double-prise-medicament':'Médicament pris deux fois par erreur : les informations à vérifier, les gestes à éviter et les repères pour demander un avis adapté.',
    'activite-physique-sommeil-20260824':'Activité physique et sommeil : ce que montrent les études, les bénéfices possibles et les limites des résultats sur l’apnée du sommeil.',
    'sciatique-irm-quand':'Sciatique : dans quels cas une IRM est-elle utile ? Repères sur l’imagerie, les symptômes persistants et les signes d’alerte.',
    'nycturie-levers-nocturnes-uriner':'Se lever plusieurs fois la nuit pour uriner : causes possibles et signes à faire évaluer. Comprendre la nycturie et les réveils nocturnes.',
    'saignement-apres-menopause':'Saignements après la ménopause : pourquoi une évaluation médicale est nécessaire, quelles causes sont possibles et quels examens peuvent être proposés.'
  };
  const related={
    'double-prise-medicament':['oubli-medicament','automedication-sans-ordonnance-risques','medicaments-complements-interactions'],
    'oubli-medicament':['double-prise-medicament','automedication-sans-ordonnance-risques'],
    'automedication-sans-ordonnance-risques':['double-prise-medicament','medicaments-complements-interactions'],
    'activite-physique-sommeil-20260824':['insomnie-adulte','sommeil-apres-60-ans'],
    'insomnie-adulte':['activite-physique-sommeil-20260824','sommeil-apres-60-ans'],
    'sciatique-irm-quand':['lombalgie-adulte','sciatique-faut-il-irm'],
    'sciatique-faut-il-irm':['sciatique-irm-quand','lombalgie-adulte'],
    'lombalgie-adulte':['sciatique-irm-quand','sciatique-faut-il-irm'],
    'nycturie-levers-nocturnes-uriner':['nycturie-prostate','uriner-souvent-journee-pollakiurie-polyurie'],
    'nycturie-prostate':['nycturie-levers-nocturnes-uriner','uriner-souvent-journee-pollakiurie-polyurie'],
    'uriner-souvent-journee-pollakiurie-polyurie':['nycturie-levers-nocturnes-uriner','nycturie-prostate'],
    'saignement-apres-menopause':['menopause','secheresse-vaginale-menopause'],
    'menopause':['saignement-apres-menopause','secheresse-vaginale-menopause'],
    'secheresse-vaginale-menopause':['saignement-apres-menopause','menopause']
  };
  function description(card){
    if(approvedRevisionMetadata[card.id])return approvedRevisionMetadata[card.id].description;
    if(descriptions[card.id])return descriptions[card.id];
    const text=String(card.answer||'Information santé claire et sourcée par MACASANTÉ.').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
    if(text.length<=155)return text;
    const sentence=text.match(/^.{50,153}?[.!?](?=\s|$)/);
    if(sentence)return sentence[0];
    const prefix=text.slice(0,154);const boundary=prefix.lastIndexOf(' ');
    return prefix.slice(0,boundary>0?boundary:154).replace(/[ ,;:]+$/,'')+'…';
  }
  function relatedIds(card){return Array.isArray(card.relatedIds)&&card.relatedIds.length?card.relatedIds:(related[card.id]||[]);}
  const api={title,description,relatedIds};
  if(typeof module==='object'&&module.exports)module.exports=api;
  root.MACA_FICHE_SEO_METADATA=api;
})(typeof globalThis==='object'?globalThis:this);
