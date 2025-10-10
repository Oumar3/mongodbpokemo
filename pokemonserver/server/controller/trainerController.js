const Trainer = require("../model/Trainer");

// GET - Récupérer tous les trainers
const getTrainers = async (req, res) => {
    try {
        const trainers = await Trainer.find().populate('pokemons');
        res.status(200).json({
            success: true,
            count: trainers.length,
            data: trainers
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Erreur lors de la récupération des trainers",
            error: err.message
        });
    }
};

// GET - Récupérer un trainer par ID
const getTrainerById = async (req, res) => {
    try {
        const trainer = await Trainer.findById(req.params.id).populate('pokemons');
        if (!trainer) {
            return res.status(404).json({
                success: false,
                message: "Trainer non trouvé"
            });
        }
        res.status(200).json({
            success: true,
            data: trainer
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Erreur lors de la récupération du trainer",
            error: err.message
        });
    }
};

// POST - Créer un nouveau trainer
const createTrainer = async (req, res) => {
    const { name, age, pokemons } = req.body;
    try {
        // Validation des données
        if (!name || !age) {
            return res.status(400).json({
                success: false,
                message: "Le nom et l'âge sont requis"
            });
        }

        const newTrainer = new Trainer({
            name,
            age,
            pokemons: pokemons || []
        });

        const savedTrainer = await newTrainer.save();
        res.status(201).json({
            success: true,
            message: "Trainer créé avec succès",
            data: savedTrainer
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Erreur lors de la création du trainer",
            error: err.message
        });
    }
};

// PUT - Mettre à jour un trainer
const updateTrainer = async (req, res) => {
    try {
        const { name, age, pokemons } = req.body;
        
        const updatedTrainer = await Trainer.findByIdAndUpdate(
            req.params.id,
            { name, age, pokemons },
            { new: true, runValidators: true }
        ).populate('pokemons');

        if (!updatedTrainer) {
            return res.status(404).json({
                success: false,
                message: "Trainer non trouvé"
            });
        }

        res.status(200).json({
            success: true,
            message: "Trainer mis à jour avec succès",
            data: updatedTrainer
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Erreur lors de la mise à jour du trainer",
            error: err.message
        });
    }
};

// DELETE - Supprimer un trainer
const deleteTrainer = async (req, res) => {
    try {
        const deletedTrainer = await Trainer.findByIdAndDelete(req.params.id);
        
        if (!deletedTrainer) {
            return res.status(404).json({
                success: false,
                message: "Trainer non trouvé"
            });
        }

        res.status(200).json({
            success: true,
            message: "Trainer supprimé avec succès",
            data: deletedTrainer
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Erreur lors de la suppression du trainer",
            error: err.message
        });
    }
};

// // POST - Ajouter un Pokémon à un trainer
// const addPokemonToTrainer = async (req, res) => {
//     try {
//         const { trainerId } = req.params;
//         const { pokemonId } = req.body;

//         const trainer = await Trainer.findById(trainerId);
//         if (!trainer) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Trainer non trouvé"
//             });
//         }

//         // Vérifier si le Pokémon n'est pas déjà dans la liste
//         if (trainer.pokemons.includes(pokemonId)) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Ce Pokémon est déjà dans l'équipe du trainer"
//             });
//         }

//         trainer.pokemons.push(pokemonId);
//         const updatedTrainer = await trainer.save();
//         await updatedTrainer.populate('pokemons');

//         res.status(200).json({
//             success: true,
//             message: "Pokémon ajouté à l'équipe du trainer",
//             data: updatedTrainer
//         });
//     } catch (err) {
//         res.status(500).json({
//             success: false,
//             message: "Erreur lors de l'ajout du Pokémon",
//             error: err.message
//         });
//     }
// };

// // DELETE - Retirer un Pokémon d'un trainer
// const removePokemonFromTrainer = async (req, res) => {
//     try {
//         const { trainerId, pokemonId } = req.params;

//         const trainer = await Trainer.findById(trainerId);
//         if (!trainer) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Trainer non trouvé"
//             });
//         }

//         trainer.pokemons = trainer.pokemons.filter(pokemon => pokemon.toString() !== pokemonId);
//         const updatedTrainer = await trainer.save();
//         await updatedTrainer.populate('pokemons');

//         res.status(200).json({
//             success: true,
//             message: "Pokémon retiré de l'équipe du trainer",
//             data: updatedTrainer
//         });
//     } catch (err) {
//         res.status(500).json({
//             success: false,
//             message: "Erreur lors du retrait du Pokémon",
//             error: err.message
//         });
//     }
// };

module.exports = {
    getTrainers,
    getTrainerById,
    createTrainer,
    updateTrainer,
    deleteTrainer,
    // addPokemonToTrainer,
    // removePokemonFromTrainer
};
