const EventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    organizerEmail: { type: String, required: true },
    description: { type: String },
  }, { timestamps: true });
  
  module.exports = mongoose.model('Event', EventSchema);