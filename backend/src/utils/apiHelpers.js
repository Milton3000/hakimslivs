function productErrorHandler(error, res) {
    if (error.name === 'ValidationError') {
        // Handle validation errors
        const errors = Object.values(error.errors).map(error => error.message);
        return res.status(400).json({ message: 'Validation error', errors });
    } else if (error.name === 'CastError' && error.kind === 'ObjectId') {

        return res.status(400).json({ message: 'Invalid product ID. Please provide a valid product ID.' });
    } else {
        // Handle other errors
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export { productErrorHandler };