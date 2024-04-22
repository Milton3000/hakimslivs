const validateRequired = (value) => !!value.length;

function validateProduct(product) {
  const MAX_STRING_LENGTH = 40;
  const MAX_STRING_DESCRIPTION_LENGTH = 600;
  const MAX_NUMERIC_VALUE = 5;

  return {
    title: !validateRequired(product.title)
      ? 'Titel är obligatoriskt'
      : product.title.length > MAX_STRING_LENGTH
        ? `Titel får inte vara längre än ${MAX_STRING_LENGTH} tecken`
        : '',
    category: !validateRequired(product.category)
      ? 'Kategori är obligatoriskt'
      : product.category.length > MAX_STRING_LENGTH
        ? `Kategori får inte vara längre än ${MAX_STRING_LENGTH} tecken`
        : '',
    brand: !validateRequired(product.brand)
      ? 'Tillverkare är obligatoriskt'
      : product.brand.length > MAX_STRING_LENGTH
        ? `Tillverkare får inte vara längre än ${MAX_STRING_LENGTH} tecken`
        : '',
    origin: !validateRequired(product.origin)
      ? 'Ursprung är obligatoriskt'
      : product.origin.length > MAX_STRING_LENGTH
        ? `Ursprung får inte vara längre än ${MAX_STRING_LENGTH} tecken`
        : '',
    price: product.price === undefined || product.price === null || product.price === ''
      ? 'Pris är obligatoriskt'
      : isNaN(product.price)
        ? 'Pris måste vara ett nummer'
        : product.price.toString().length > MAX_NUMERIC_VALUE
          ? `Priset får inte vara längre än ${MAX_NUMERIC_VALUE} siffror`
          : '',
    unit_price: product.unit_price === undefined || product.unit_price === null || product.unit_price === ''
      ? 'Jämförpris är obligatoriskt'
      : isNaN(product.unit_price)
        ? 'Jämförpris måste vara ett nummer'
        : product.unit_price.toString().length > MAX_NUMERIC_VALUE
          ? `Jämförpriset får inte vara längre än ${MAX_NUMERIC_VALUE} siffror`
          : '',
    description: !validateRequired(product.description)
      ? 'Beskrivning är obligatoriskt'
      : product.description.length > MAX_STRING_DESCRIPTION_LENGTH
        ? `Beskrivning får inte vara längre än ${MAX_STRING_DESCRIPTION_LENGTH} tecken`
        : '',
    quantity: product.quantity === undefined || product.quantity === null || product.quantity === ''
      ? 'Kvantitet är obligatoriskt'
      : isNaN(product.quantity)
        ? 'Kvantitet måste vara ett nummer'
        : product.quantity.toString().length > MAX_NUMERIC_VALUE
          ? `Kvantitet får inte vara längre än ${MAX_NUMERIC_VALUE} siffror`
          : '',
    unit: !validateRequired(product.unit)
      ? 'Enhet är obligatoriskt'
      : product.unit.length > MAX_STRING_LENGTH
        ? `Enhet får inte vara längre än ${MAX_STRING_LENGTH} tecken`
        : '',
    weight: product.weight === undefined || product.weight === null || product.weight === ''
      ? 'Vikt är obligatoriskt'
      : isNaN(product.weight)
        ? 'Vikt måste vara ett nummer'
        : product.weight.toString().length > MAX_NUMERIC_VALUE
          ? `Vikt får inte vara längre än ${MAX_NUMERIC_VALUE} siffror`
          : '',
    TOC: !validateRequired(product.TOC)
      ? 'TOC är obligatoriskt'
      : product.TOC.length > MAX_STRING_LENGTH
        ? `TOC får inte vara längre än ${MAX_STRING_LENGTH} tecken`
        : '',
    imageUrl: !validateRequired(product.imageUrl)
      ? 'Bildkälla är obligatoriskt'
      : product.imageUrl.length > MAX_STRING_DESCRIPTION_LENGTH
        ? `Bildkälla får inte vara längre än ${MAX_STRING_DESCRIPTION_LENGTH} tecken`
        : '',
  };
}

export { validateProduct };
