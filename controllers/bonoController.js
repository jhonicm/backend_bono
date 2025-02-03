const Bono = require('../models/bonoModel');

// Función para calcular el bono
const calcularBono = (antiguedad, sueldo) => {
    let bonoAntiguedad = 0;
    let bonoSueldo = 0;

    // Calcular bono por antigüedad
    if (antiguedad > 2 && antiguedad < 5) {
        bonoAntiguedad = sueldo * 0.20;
    } else if (antiguedad >= 5) {
        bonoAntiguedad = sueldo * 0.30;
    }

    // Calcular bono por sueldo
    if (sueldo < 1000) {
        bonoSueldo = sueldo * 0.25;
    } else if (sueldo >= 1000 && sueldo <= 3500) {
        bonoSueldo = sueldo * 0.15;
    } else if (sueldo > 3500) {
        bonoSueldo = sueldo * 0.10;
    }

    // Retornar los bonos calculados
    return {
        bonoAntiguedad,
        bonoSueldo,
        bonoMayor: Math.max(bonoAntiguedad, bonoSueldo)
    };
};

const getBonos = async (req, res) => {
    try {
        const bonos = await Bono.find();
        res.json(bonos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createBono = async (req, res) => {
    const { nombre, antiguedad, sueldo } = req.body;
    const { bonoMayor } = calcularBono(antiguedad, sueldo);

    const nuevoBono = new Bono({
        nombre,
        antiguedad,
        sueldo,
        bono: bonoMayor
    });

    try {
        const savedBono = await nuevoBono.save();
        res.status(201).json(savedBono);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const updateBono = async (req, res) => {
    const { nombre, antiguedad, sueldo } = req.body;
    const { bonoMayor } = calcularBono(antiguedad, sueldo);

    try {
        const updatedBono = await Bono.findByIdAndUpdate(req.params.id, {
            nombre,
            antiguedad,
            sueldo,
            bono: bonoMayor
        }, { new: true });

        if (!updatedBono) return res.status(404).json({ message: 'Bono no encontrado' });
        res.json(updatedBono);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteBono = async (req, res) => {
    try {
        const bono = await Bono.findByIdAndDelete(req.params.id);
        if (!bono) return res.status(404).json({ message: 'Bono no encontrado' });
        res.json({ message: 'Bono eliminado' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const calcularBonoHandler = (req, res) => {
    const { antiguedad, sueldo } = req.body;
    const { bonoAntiguedad, bonoSueldo, bonoMayor } = calcularBono(antiguedad, sueldo);
    res.json({ bonoAntiguedad, bonoSueldo, bonoMayor });
};

module.exports = {
    getBonos,
    createBono,
    updateBono,
    deleteBono,
    calcularBono: calcularBonoHandler
};