# Santé Juste — audit de traçabilité des 26 fiches

Date de vérification : 20/08/2026

## Règle appliquée

Chaque fiche doit afficher les références réellement utilisées, sous une forme traçable : organisme ou société savante, titre précis du document ou de la page, année lorsque disponible, et lien direct. Une société savante n'est ajoutée que si une ressource pertinente a été identifiée ; elle n'est jamais ajoutée pour l'apparence. Les libellés génériques du type « sources concordantes » ne remplacent plus l'affichage des références.

Hiérarchie : autorité sanitaire française → société savante française pertinente → littérature scientifique de haut niveau si nécessaire → international en complément si absence de référence française suffisante.

## Résultat

26/26 fiches disposent maintenant d'un registre de sources détaillé dans `source-registry.js` et d'un affichage public dédié via `source-ui.js`.

### Pédiatrie / parents / médicaments

- Fièvre enfant : HAS + Assurance Maladie + Société Française de Pédiatrie.
- Diarrhée enfant : Assurance Maladie + GFHGNP, recommandations d'experts 2024.
- Bébé tète moins : 1000 premiers jours, Guide de l'allaitement maternel + Assurance Maladie. Pas de société savante ajoutée artificiellement.
- Toux enfant : Assurance Maladie + SFP/CNPU + recommandation HAS/SFP bronchiolite pour les signes respiratoires du nourrisson.
- Vomissements enfant : GFHGNP 2024 + Assurance Maladie.
- Éruption enfant : Assurance Maladie + Carnet de santé 2025. Pas de société savante générale ajoutée car aucune recommandation unique ne couvre toutes les éruptions possibles de cette fiche.
- Sommeil bébé : Carnet de santé 2025 + Société Française de Pédiatrie (prévention de la mort inattendue du nourrisson).
- Écrans avant 3 ans : Ministère de la Santé + Carnet de santé 2025 fondé sur les travaux du HCSP.
- Paracétamol enfant : HAS + Société Française de Pédiatrie + document de posologie pédiatrique HAS/RCP.
- Ibuprofène enfant : HAS + références HAS/SPILF/SFP-GPIP + référence de sécurité ANSM.
- État général du nourrisson : HAS + Carnet de santé 2025.
- Difficulté respiratoire enfant : Assurance Maladie + recommandation HAS/SFP bronchiolite.
- Déshydratation enfant : Assurance Maladie + GFHGNP 2024.
- Rhinopharyngite/nez bouché : HAS avec SPILF/SFP-GPIP + Assurance Maladie.
- Douleur d'oreille/otite : HAS avec SPILF/GPIP + Assurance Maladie.

### Adulte / prévention / nutrition / gériatrie / symptômes

- Antibiotiques et rhume : Santé publique France + HAS/SPILF.
- Hypertension : Société Française d'Hypertension Artérielle + HAS.
- 10 000 pas : méta-analyse The Lancet Public Health 2025.
- Fibres : Anses, référence nutritionnelle nationale.
- Boissons sucrées enfant : HCSP + Anses.
- Mémoire : SFGG/FCM et sociétés partenaires, recommandations 2026 + Assurance Maladie.
- Chutes après 65 ans : HAS 2024 + SFGG.
- Piqûre de tique : HAS 2025 + Assurance Maladie.
- Brûlure : Assurance Maladie ; aucune société savante n'est affichée tant qu'un document public précis correspondant exactement à la fiche n'est pas identifié.
- Douleur abdominale : Assurance Maladie + SNFGE comme ressource de spécialité ; le lien public principal reste la fiche Assurance Maladie détaillant les signes d'urgence.
- Maux de tête : Assurance Maladie, mise à jour juin 2026 + Société Française d'Étude des Migraines et Céphalées.

## Points corrigés par rapport à la première version

1. Les mentions vagues « Sources concordantes » ne sont plus utilisées comme substitut aux références dans la fenêtre publique.
2. Les sociétés savantes pertinentes sont désormais visibles, notamment SFP/CNPU, GFHGNP, GPIP/SPILF, SFHTA, SFGG et SFEMC.
3. Chaque source affichée possède un lien propre ; le lecteur peut consulter chaque référence séparément.
4. La date de vérification reste affichée : 20/08/2026.
5. Les références seront réévaluées lors de chaque mise à jour substantielle d'une fiche.
