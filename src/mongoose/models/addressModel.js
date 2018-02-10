exports.address = {
  city: {type: String, lowercase: true, trim: true, required: true},
  street: {type: String, lowercase: true, trim: true, required: true},
  number: {type: String, lowercase: true, trim: true, required: true},
  zipCode: {type: String, lowercase: true, trim: true, required: true},
  state: {type: String, lowercase: true, trim: true, required: true}
}
