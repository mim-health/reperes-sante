/* MACA Santé — validation ciblée du 22/08/2026.
   Ne contient que les fiches dont les points essentiels ont été recontrôlés
   sur des références précises. Les autres fiches restent AUDITED_LEGACY. */
(function(){
  const validations={
    hta:{
      validationStatus:'VALIDATED',validatedAt:'22/08/2026',verifiedAt:'22/08/2026',nextAuditAt:'22/11/2026',auditIntervalMonths:3,
      source:'HAS · Société Française d’Hypertension Artérielle',
      url:'https://www.has-sante.fr/jcms/c_2059286/fr/prise-en-charge-de-l-hypertension-arterielle-de-l-adulte',
      evidenceStatus:'Sources concordantes · recommandation HAS/SFHTA',
      evidenceNotes:'Confirmation hors cabinet et règle des 3 recontrôlées sur la fiche mémo HAS/SFHTA.'
    },
    paracetamol:{
      validationStatus:'VALIDATED',validatedAt:'22/08/2026',verifiedAt:'22/08/2026',nextAuditAt:'22/11/2026',auditIntervalMonths:3,
      source:'ANSM · données pédiatriques selon le poids',
      url:'https://ansm.sante.fr/uploads/2023/02/02/20230202-fiche-pharmaciens-paracetamol-alternatives-pediatriques.pdf',
      evidenceStatus:'Référence nationale précise',
      evidenceNotes:'Posologie usuelle pédiatrique recontrôlée : environ 60 mg/kg/jour, répartie en plusieurs prises et adaptée au poids.'
    },
    'ibuprofene-enfant':{
      validationStatus:'VALIDATED',validatedAt:'22/08/2026',verifiedAt:'22/08/2026',nextAuditAt:'22/11/2026',auditIntervalMonths:3,
      source:'ANSM · sécurité des AINS chez l’enfant',
      url:'https://ansm.sante.fr/uploads/2021/03/11/8a3e72e8fec9c0f68797a73832372321.pdf',
      evidenceStatus:'Référence nationale précise',
      evidenceNotes:'Précautions déshydratation et varicelle recontrôlées dans les données de sécurité ANSM.'
    }
  };
  if(!Array.isArray(window.auditedQuestionOverrides))return;
  window.auditedQuestionOverrides=window.auditedQuestionOverrides.map(item=>validations[item.id]?{...item,...validations[item.id]}:item);
})();
