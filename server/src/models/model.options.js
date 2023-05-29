const modelOptions = {
  toJson: {
    virtuals: true,
    transform: (_,obj) => {
      delete obj._id;
      return obj
    }
  },
  toObject: {
    virtuals: true,
    transform: (_,obj) => {
      delete obj._id;
      return obj
    }
  },
  versonKey: false,
  timestamps: true
}

export default modelOptions;
