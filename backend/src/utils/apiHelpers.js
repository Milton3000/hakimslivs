function productErrorHandler(error, res) {
    if (error.name === 'ValidationError') {
        // Handle validation errors
        const errors = Object.values(error.errors).map(error => error.message);
        console.error('Validation error:', errors);
        return res.status(400).json({ message: 'Validation error', errors });
    } else if (error.name === 'CastError' && error.kind === 'ObjectId') {
        // Handle invalid product ID error
        console.error('Invalid product ID:', error);
        return res.status(400).json({ message: 'Invalid product ID' });
    } else {
        // Handle other errors
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export { productErrorHandler };