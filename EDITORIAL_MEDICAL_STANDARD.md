# Cahier des charges éditorial médical — MACA

Version : 1.0 — 21/08/2026

## Règle obligatoire pour toute fiche médicale

Aucune nouvelle fiche ne peut être marquée VALIDÉE sans une vérification croisée des références françaises pertinentes.

### 1. Croisement documentaire obligatoire
Pour chaque fiche, rechercher et confronter :
- Haute Autorité de Santé (HAS), lorsqu'une recommandation pertinente existe ;
- Assurance Maladie / Ameli, lorsqu'une information pertinente existe ;
- la ou les sociétés savantes françaises de référence de la spécialité concernée ;
- selon le sujet : ANSM, Santé publique France, Anses, HCSP, Ministère de la Santé ou autre institution française compétente ;
- une référence européenne/internationale peut compléter le corpus lorsqu'elle apporte une information utile ou lorsqu'il n'existe pas de recommandation française récente.

Le croisement doit être réel : les sources sont comparées sur les messages essentiels, seuils, indications, contre-indications, délais et points de sécurité. Une société savante ne doit jamais être ajoutée comme simple caution bibliographique sans vérification de son contenu.

Si les recommandations divergent, la divergence doit être documentée et la synthèse ne doit pas présenter artificiellement un consensus.

Si une source est ancienne, son ancienneté doit être signalée dans les métadonnées et prise en compte dans le niveau de confiance.

### 2. Métadonnées minimales d'une fiche VALIDÉE
Toute fiche validée doit comporter au minimum :
- `verifiedAt` : date de la dernière validation médicale ;
- `nextAuditAt` : date prévue du prochain audit ;
- `auditIntervalMonths: 3` ;
- `validationStatus: VALIDATED` ;
- liste des sources réellement vérifiées ;
- société(s) savante(s) consultée(s), lorsque pertinente(s) ;
- date/version des recommandations lorsque disponible ;
- éventuelles divergences ou limites.

### 3. Ré-audit trimestriel obligatoire
Toute fiche médicale doit être ré-auditée au maximum tous les 3 mois à compter de sa dernière validation.

Exemple : fiche validée le 21/08/2026 → prochain audit au plus tard le 21/11/2026.

À chaque ré-audit :
1. rechercher les nouvelles recommandations/publications institutionnelles françaises ;
2. rechercher les mises à jour des sociétés savantes françaises concernées ;
3. comparer avec la version publiée ;
4. corriger la fiche si nécessaire ;
5. mettre à jour `verifiedAt` et calculer un nouveau `nextAuditAt` à +3 mois ;
6. conserver la traçabilité de la modification.

Une fiche dont `nextAuditAt` est dépassé doit être considérée `AUDIT_DUE` et ne doit plus être présentée comme récemment validée tant que le contrôle n'a pas été effectué.

### 4. Restitution lors d'une validation
Quand une nouvelle fiche est déclarée validée, la restitution doit explicitement indiquer :
- « Validée le JJ/MM/AAAA » ;
- « Prochain ré-audit : JJ/MM/AAAA ».

### 5. Principe éditorial
La valeur ajoutée de MACA repose sur la synthèse et la confrontation des références médicales, et non sur la reproduction d'une source unique. La priorité reste donnée aux références françaises fiables, actuelles et traçables.
