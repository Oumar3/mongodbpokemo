const Zone = require("../model/Zones");
const Pokemon = require("../model/Pokemon");
const mongoose = require("mongoose");

// GET - Récupérer toutes les zones
const getZones = async (req, res) => {
    try {
        const zones = await Zone.find().populate('pokemons');
        res.status(200).json({
            success: true,
            count: zones.length,
            data: zones
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Erreur lors de la récupération des zones",
            error: err.message
        });
    }
};

// GET - Récupérer une zone par ID
const getZoneById = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({message:"ID de zone invalide"})
    }

    try {   
        const zone = await Zone.findById(id).populate('pokemons');
        if (!zone) {
            return res.status(404).json({
                success: false,
                message: "Zone non trouvée"
            });
        }
        res.status(200).json({
            success: true,
            data: zone
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Erreur lors de la récupération de la zone",
            error: err.message
        });
    }
};

// POST - Créer une nouvelle zone
const createZone = async (req, res) => {
    const { name,  region, pokemons } = req.body;
    try {
        // Validation des données
        if (!name || !region) {
            return res.status(400).json({
                success: false,
                message: "Le nom et la région sont requis"
            });
        }

        const newZone = new Zone({
            name,
            region,
            pokemons: pokemons || []
        });

        const savedZone = await newZone.save();
        
        // Si des Pokémon sont associés, mettre à jour leur liste de zones
        if (pokemons && pokemons.length > 0) {
            await Pokemon.updateMany(
                { _id: { $in: pokemons } },
                { $addToSet: { zones: savedZone._id } }
            );
        }

        const populatedZone = await Zone.findById(savedZone._id).populate('pokemons');
        
        res.status(201).json({
            success: true,
            message: "Zone créée avec succès",
            data: populatedZone
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Erreur lors de la création de la zone",
            error: err.message
        });
    }
};

// PUT - Mettre à jour une zone
const updateZone = async (req, res) => {
    const {id} =  req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message:"Not Found Zone try again"})
    }
    try {
        const { name, region, pokemons } = req.body;
        
        const updatedZone = await Zone.findByIdAndUpdate(
           id,
            { name, region, pokemons },
            { new: true, runValidators: true }
        ).populate('pokemons');

        if (!updatedZone) {
            return res.status(404).json({
                success: false,
                message: "Zone non trouvée"
            });
        }

        res.status(200).json({
            success: true,
            message: "Zone mise à jour avec succès",
            data: updatedZone
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Erreur lors de la mise à jour de la zone",
            error: err.message
        });
    }
};

// DELETE - Supprimer une zone
const deleteZone = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({message:"ID de zone invalide"})
    }
    try {
        const zone = await Zone.findById(id);
        
        if (!zone) {
            return res.status(404).json({
                success: false,
                message: "Zone non trouvée"
            });
        }

        // Retirer cette zone de tous les Pokémon qui y sont associés
        await Pokemon.updateMany(
            { zones: id },
            { $pull: { zones: id } }
        );

        await Zone.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Zone supprimée avec succès"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Erreur lors de la suppression de la zone",
            error: err.message
        });
    }
};


module.exports = {
    getZones,
    getZoneById,
    createZone,
    updateZone,
    deleteZone,
};