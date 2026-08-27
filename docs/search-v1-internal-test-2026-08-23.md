# MACA Santé — banc interne recherche V1 — 23/08/2026

Objectif : éprouver la recherche avant reprise des tests utilisateurs, sans chatbot et sans génération de réponse.

## Règles de validation
- **OK** : la première fiche proposée répond directement à l’intention.
- **Acceptable** : une fiche directement pertinente apparaît dans les 3 premières.
- **Échec** : fiche hors sujet présentée comme réponse précise.
- **Absence de fiche** : préférer « pas encore de fiche répondant précisément » à une correspondance faible.

## 50 requêtes grand public

### Enfant / parents
1. fièvre enfant
2. mon bébé a de la fièvre
3. fievre bebe
4. mon enfant tousse
5. bébé tousse la nuit
6. selles liquides enfant
7. gastro bébé
8. mon bébé boit moins
9. bébé tète moins
10. boutons ventre enfant

### Cœur / circulation
11. tension
12. tension trop haute
13. hypertension
14. HTA
15. pression artérielle
16. jambes lourdes
17. jambes gonflées
18. mollets gonflés
19. palpitations
20. coeur qui bat vite

### Digestion
21. mal au ventre
22. douleur abdominale
23. mal estomac
24. constipation
25. diarrhée
26. je vomis
27. reflux
28. brûlures estomac

### Médicaments
29. doliprane
30. paracétamol
31. advil
32. nurofen
33. ibuprofène enfant
34. antibiotique rhume
35. médicament fièvre enfant

### Vie quotidienne / prévention
36. sommeil
37. je dors mal
38. insomnie
39. fatigue
40. cholestérol
41. combien de pas par jour
42. sport
43. tique
44. morsure de tique
45. acouphènes
46. oreilles qui sifflent

### Formulations difficiles / anti-faux-positifs
47. dépression nerveuse
48. moral à zéro
49. je ne me sens pas bien
50. douleur bizarre

## Points déjà présents dans le moteur au 23/08
- normalisation accents/majuscules ;
- mots-outils retirés ;
- tolérance limitée aux fautes ;
- stemming simple ;
- synonymes/concepts (ex. HTA/tension/pression artérielle, bébé/nourrisson, Doliprane/paracétamol, Advil/Nurofen/ibuprofène, acouphènes/sifflements) ;
- pondération titre > mots-clés > catégorie > réponse ;
- seuil de pertinence ;
- message explicite lorsqu’aucune fiche ne répond précisément ;
- suggestions proches séparées de la réponse précise.

## Garde-fou V1
Une requête vague ou hors corpus ne doit jamais être forcée vers une fiche simplement parce qu’un mot apparaît dans le texte de la réponse. La recherche MACA reste un moteur de fiches validées, pas un chatbot.

## Critère avant tests utilisateurs
Aucun faux positif manifeste sur les requêtes 47–50 ; les requêtes couvertes par le corpus doivent retrouver une fiche directement pertinente. Les lacunes de vocabulaire doivent être corrigées dans le dictionnaire de concepts ou les mots-clés des fiches, sans modifier l’interface validée.