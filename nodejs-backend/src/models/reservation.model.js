// See http://mongoosejs.com/docs/models.html
    // for more of what you can do here.
    module.exports = function (app) {
        const modelName = 'reservation';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          // ~cb-read-start~
          {
       reservationid: { type: String, required: true },
       rcustomername: { type: String, required: true },
       checkin: { type: Date, required: true },
       checkout: { type: Date, required: true },
       noofnight: { type: Number, required: true },
       numberguess: { type: Number, required: true },
       roomtype: { type: String, required: true },
       roomrate: { type: Number, required: true },
       paymentdetail: { type: String },

    }
          // ~cb-read-end~
          , 
          {
          timestamps: true
        });
      
        // This is necessary to avoid model compilation errors in watch mode
        // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };