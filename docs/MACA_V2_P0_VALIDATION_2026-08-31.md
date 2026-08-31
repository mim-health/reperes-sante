# MACA V2 — Lot P0 de validation

**Date : 31/08/2026**  
**Statut : VALIDÉ médicalement le 31/08/2026 — prêt pour traduction en règles moteur après sécurisation du corpus**  
**Principe : un faux positif est plus grave qu'un non-résultat.**

## A. Arbitrages validés des principaux clusters

| Intention | Fiche cible générale validée | Fiche secondaire / règle |
|---|---|---|
| Reflux / RGO adulte | `reflux-adulte` | `rgo-adulte` retirée du routage général jusqu'à consolidation éditoriale |
| Vertiges | `vertiges-causes` | `vertiges-adulte` seulement si requête centrée sur signes d'alerte / quand consulter |
| Essoufflement | `essoufflement-adulte` | `essoufflement-causes-signes-alerte` retirée du routage général jusqu'à consolidation |
| Palpitations | `palpitations-adulte` | `palpitations-quand-consulter` pour « quand consulter / dangereux / urgence » ; `palpitations` legacy non ciblée |
| Cystite | `maca-cystite-reperes` | `cystite-femme` = doublon fonctionnel, superseded / non routable après consolidation |
| Migraine | `migraine-que-faire` | `migraine-adulte` seulement si « traitement de fond / crises fréquentes » |
| Tique | `maca-tique-conduite` pour geste immédiat | `tique` pour surveillance après morsure |
| Poux enfant | `poux-enfant-traitement` | `poux-enfant` retirée du routage général jusqu'à consolidation |
| Diversification alimentaire | `diversification-alimentaire` | `diversification-alimentaire-bebe` retirée du routage général jusqu'à consolidation |
| Ménopause | `menopause` | `maca-menopause-bouffees` si bouffées de chaleur ; `perimenopause-signes-quand-consulter` si préménopause/périménopause |

## B. Intentions P0 — formulations validées et veto

### P0-01 — Mal au ventre → `douleur-abdominale`
**Accepter :** mal au ventre ; douleur au ventre ; douleur abdominale ; ventre douloureux ; mon ventre me fait mal.  
**Association autorisée :** brûlures d'estomac ; remontées acides ; mal d'estomac peuvent rester dans le cluster ventre–reflux.  
**Règle d'arbitrage :** si la requête décrit clairement reflux/acide/remontées/brûlures, la fiche reflux garde la priorité ; sinon la fiche douleur abdominale reste candidate.

### P0-02 — Reflux adulte → `reflux-adulte`
**Accepter :** reflux ; reflux gastrique ; RGO ; reflux gastro-œsophagien ; remontées acides ; brûlures d'estomac ; acide qui remonte ; pyrosis.  
**Refuser :** régurgitations du bébé/nourrisson.  
**Contexte :** adulte/général ; un contexte bébé doit exclure cette fiche.

### P0-03 — Crampes musculaires → `crampes-musculaires-causes`
**Accepter :** crampes ; crampes nocturnes ; crampes la nuit ; crampe au mollet ; muscle qui se contracte.  
**Refuser :** jambe ou mollet gonflé ; jambe rouge ; douleur unilatérale avec gonflement ; palpitations.  
**Règle :** ne jamais router « crampe » vers thrombose ou palpitations par proximité sémantique.

### P0-04 — Perte de cheveux → `alopecie-causes-pelade-traitement`
**Accepter :** perte de cheveux ; chute de cheveux ; cheveux qui tombent ; alopécie ; pelade ; plaque sans cheveux.  
**Refuser :** cholestérol ; démangeaisons du cuir chevelu seules ; poux/lentes.

### P0-05 — Saignement de nez enfant → `saignement-nez-enfant`
**Accepter :** mon enfant saigne du nez ; nez qui saigne chez mon enfant ; épistaxis enfant.  
**Refuser :** saignement de nez chez l'adulte si aucun contexte enfant n'est fourni.  
**Contexte obligatoire :** enfant/bébé ou navigation dans la rubrique enfant.

### P0-06 — Eczéma → `eczema-que-faire`
**Accepter :** eczéma ; dermatite atopique ; plaques rouges qui démangent ; peau sèche qui gratte, si contexte compatible.  
**Refuser :** démangeaisons seules ; jambes lourdes ; varices ; prurit sans lésion décrite.

### P0-07 — Œil rouge enfant → `oeil-rouge-enfant`
**Accepter :** mon enfant a l'œil rouge ; yeux rouges chez mon enfant ; œil qui coule enfant ; paupières collées ; conjonctivite enfant.  
**Refuser :** yeux rouges/secs/qui piquent chez l'adulte ; douleur oculaire adulte ; migraine ; otite.  
**Contexte obligatoire :** enfant/bébé.

### P0-08 — Douleur du genou → `douleur-genou-escaliers`
**Accepter :** mal au genou ; douleur du genou ; douleur dans les escaliers ; douleur autour/derrière la rotule.  
**Refuser / abstention :** traumatisme récent important ; genou rouge et très gonflé ; douleur localisée à une autre articulation.  
**Règle :** « genou » est un veto anatomique absolu contre otite, migraine ou autre région.

### P0-09 — Acouphènes → `acouphenes-adulte`
**Accepter :** acouphènes ; bourdonnements ; oreilles qui sifflent ; sifflement dans l'oreille ; bruit dans l'oreille.  
**Association autorisée :** vertiges peuvent être associés aux acouphènes. Si les deux sont explicitement présents, les deux intentions peuvent rester candidates.  
**Règle :** « vertige » seul n'est pas un synonyme d'acouphène.

### P0-10 — Vertiges → `vertiges-causes`
**Accepter :** vertige ; vertiges ; tête qui tourne ; tout tourne ; sensation de tourner ; perte d'équilibre avec notion de rotation.  
**Association autorisée :** acouphènes si explicitement décrits en plus des vertiges.  
**Refuser :** malaise ; sensation de s'évanouir ; fatigue.  
**Règle :** retirer `malaise` du groupe de synonymes automatique des vertiges.

### P0-11 — Lombalgie → `lombalgie-adulte`
**Accepter :** mal en bas du dos ; lombalgie ; lumbago ; tour de rein ; dos bloqué ; mal au dos si aucune autre région n'est précisée.  
**Refuser :** douleur cervicale ; douleur d'épaule ; douleur thoracique/dorsale haute explicitement décrite.

### P0-12 — Insomnie adulte → `insomnie-adulte`
**Accepter :** je dors mal ; difficulté à m'endormir ; je n'arrive pas à dormir ; réveils nocturnes ; insomnie.  
**Refuser :** ronflement ; apnée ; sommeil du bébé ; sommeil de l'adolescent si contexte explicite.

### P0-13 — Rapport non protégé / risque IST → `rapport-non-protege-ist`
**Accepter :** rapport non protégé ; rapport sans préservatif ; préservatif craqué ; risque d'IST après un rapport.  
**Règle de séparation :** « pilule du lendemain / contraception d'urgence / jusqu'à quand » doit privilégier `contraception-urgence`.

### P0-14 — Toux prolongée adulte → `toux-prolongee-adulte`
**Accepter :** toux qui dure ; je tousse depuis longtemps ; toux persistante ; toux chronique.  
**Ne pas forcer :** « toux sèche » seule sans notion de durée ; toux enfant/bébé.

### P0-15 — Essoufflement → `essoufflement-adulte`
**Accepter :** essoufflement ; essoufflé ; souffle court ; manque d'air ; vite essoufflé ; dyspnée.  
**Refuser :** palpitations seules ; fatigue seule ; toux seule.

### P0-16 — Palpitations → `palpitations-adulte`
**Accepter :** palpitations ; cœur qui s'emballe ; cœur qui bat fort ; battements irréguliers ; cœur qui saute ; extrasystoles.  
**Refuser :** crampes ; douleur thoracique isolée ; anxiété seule.  
**Sous-intention :** « quand consulter / est-ce dangereux / urgence » → `palpitations-quand-consulter`.

### P0-17 — Cystite → `maca-cystite-reperes`
**Accepter :** cystite ; infection urinaire ; brûlures en urinant ; envie fréquente d'uriner ; envie de faire pipi souvent + brûlures.  
**Ne pas forcer :** mal de dos isolé ; pertes vaginales seules ; fièvre + douleur lombaire/flanc sans symptômes urinaires bas.  
**Doublon :** `cystite-femme` est superseded / non routable après consolidation. Les termes tique/Lyme présents dans l'ancien référentiel étaient une erreur de génération et sont supprimés.

### P0-18 — Migraine → `migraine-que-faire`
**Accepter :** migraine ; migraines ; crise de migraine ; migraine avec aura ; mal de tête dans le cluster migraine/céphalée.  
**Règle d'arbitrage :** « mal de tête » seul peut être associé au cluster migraine mais ne doit pas supprimer la fiche générique `maux-tete`; les autres termes (migraine, aura, crise, etc.) déterminent la priorité.  
**Sous-intention :** traitement de fond / crises très fréquentes → `migraine-adulte`.

### P0-19 — Grain de beauté qui change → `grain-beaute-change-melanome`
**Accepter :** grain de beauté qui change ; grain de beauté bicolore ; nævus qui change ; grain de beauté qui grossit/évolue.  
**Refuser :** taches brunes diffuses ; lentigos ; bouton isolé.

### P0-20 — Jambes lourdes / varices → `jambes-lourdes-varices`
**Accepter :** jambes lourdes ; varices ; veines apparentes ; jambes qui gonflent le soir dans un contexte chronique/bilatéral.  
**Refuser :** une seule jambe brutalement gonflée ; mollet rouge/douloureux ; suspicion de phlébite.

### P0-21 — Une jambe gonflée → `jambe-gonflee-adulte`
**Accepter :** une jambe gonflée ; mollet gonflé ; jambe rouge et douloureuse ; phlébite ; thrombose veineuse.  
**Refuser :** jambes lourdes bilatérales chroniques ; simples varices sans gonflement aigu.

### P0-22 — Toux enfant → `toux-enfant`
**Accepter :** mon enfant tousse ; bébé tousse ; toux chez l'enfant ; toux enfant.  
**Refuser :** toux adulte ; toux prolongée adulte.  
**Contexte obligatoire :** enfant/bébé.

### P0-23 — Fièvre enfant → `fievre-enfant`
**Accepter :** mon enfant a de la fièvre ; bébé a de la fièvre ; température chez l'enfant ; fièvre enfant.  
**Refuser :** fièvre adulte si aucune fiche adulte correspondante n'est disponible.  
**Contexte obligatoire :** enfant/bébé.

### P0-24 — Fatigue depuis la rentrée → `fatigue-enfant-rentree`
**Accepter :** mon enfant est fatigué depuis la rentrée ; fatigue enfant rentrée ; mon ado est épuisé depuis la reprise des cours.  
**Refuser :** fatigue adulte ; fatigue isolée sans contexte enfant/rentrée si une fiche générale plus adaptée existe.

## C. Tests P0 obligatoires « aucun résultat » — VALIDÉS

1. **« yeux rouges » / « yeux secs » / « les yeux me piquent » chez un adulte** → aucun résultat tant qu'il n'existe pas de fiche adulte dédiée.
2. **« je tousse du sang » / « hémoptysie »** → aucun résultat tant qu'aucune fiche dédiée n'existe ; ne jamais proposer athérome ou toux simple par défaut.
3. **« la langue me pique » / « picotement de la langue »** → aucun résultat si aucune fiche dédiée.
4. **« démangeaisons de la nuque »** sans autre contexte → aucun résultat ; ne pas déduire bébé, eczéma ou autre intention par proximité.
5. **« saignement de nez » chez un adulte** → aucun résultat si seule la fiche enfant est disponible.

## D. Règle d'intégration validée

Ordre de décision du moteur :
1. formulation exacte / alias validé ;
2. contexte âge/population ;
3. veto/exclusions anatomiques et sémantiques ;
4. score des candidats restants ;
5. marge suffisante entre le premier et le second ;
6. sinon : **aucun résultat**.

### Règle d'association
Une formulation peut être **associée** à plusieurs intentions sans être un synonyme exclusif. Le moteur doit conserver les candidats pertinents et arbitrer avec le contexte :
- brûlures d'estomac / remontées acides : cluster ventre–reflux, priorité reflux si notion d'acide/remontée/brûlure ;
- vertiges + acouphènes : deux intentions possibles si les deux symptômes sont présents ;
- mal de tête : cluster céphalée/migraine, sans imposer automatiquement la migraine.

Ce lot P0 est médicalement validé et peut maintenant être traduit en référentiel exécutable après sécurisation du corpus technique.
