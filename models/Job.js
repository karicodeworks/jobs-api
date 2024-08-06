const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'Please provide company name.'],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, 'Provide the job position'],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ['interview', 'declined', 'pending'],
      default: 'pending',
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'A user is required.'],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Job', JobSchema)
