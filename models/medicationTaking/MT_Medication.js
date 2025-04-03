module.exports = (sequelize, DataTypes) => {
  const MT_Medication = sequelize.define("MT_Medication", {
    name: {type: DataTypes.STRING, allowNull: false},
    count: {type: DataTypes.FLOAT, allowNull: false},
    countMeasureId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "MT_Options",
        key: "id"
      },
    },
    inWhichId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "MT_Options",
        key: "id"
      },
    },
    inId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "MT_Options",
        key: "id"
      },
    },
    routeOfAdministrationId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "MT_Options",
        key: "id"
      },
    },
    frequency: {type: DataTypes.INTEGER, allowNull: false},
    frequencyCount: {type: DataTypes.FLOAT, allowNull: false},
    frequencyMeasureId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "MT_Options",
        key: "id"
      },
    },
    timesOfDayId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "MT_Options",
        key: "id"
      },
    },
    mealTimeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "MT_Options",
        key: "id"
      },
    },
    inBeforeCount: {type: DataTypes.FLOAT, allowNull: true},
    inBeforeMeasureId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "MT_Options",
        key: "id"
      },
    },
    periodCount: {type: DataTypes.INTEGER, allowNull: true},
    periodMeasureId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "MT_Options",
        key: "id"
      },
    },
    periodDateStart: {type: DataTypes.DATE, allowNull: true},
    periodDateEnd: {type: DataTypes.DATE, allowNull: true},
    comment: {type: DataTypes.STRING, allowNull: true},
  });

  MT_Medication.associate = function ({ MT_Course }) {
    MT_Medication.belongsTo(MT_Course, {
      onDelete: 'CASCADE',
    });
  };

  return MT_Medication;
}
