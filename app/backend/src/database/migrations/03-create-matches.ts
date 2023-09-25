module.exports = {
  up: async (
    queryInterface: {
      createTable: (
        arg0: string,
        arg1: {
          id: {
            type: any;
            allowNull: boolean;
            autoIncrement: boolean;
            primaryKey: boolean;
          };
          homeTeamId: {
            type: any;
            allowNull: boolean;
            references: { model: string; key: string };
            field: string;
          };
          homeTeamGoals: { type: any; allowNull: boolean; field: string };
          awayTeamId: {
            type: any;
            allowNull: boolean;
            references: { model: string; key: string };
            field: string;
          };
          awayTeamGoals: { type: any; allowNull: boolean; field: string };
          inProgress: {
            type: any;
            allowNull: boolean;
            defaultValue: boolean;
            field: string;
          };
        }
      ) => any;
    },
    Sequelize: { INTEGER: any; BOOLEAN: any }
  ) => {
    await queryInterface.createTable("matches", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      homeTeamId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "teams",
          key: "id",
        },
        field: "home_team_id",
      },
      homeTeamGoals: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: "home_team_goals",
      },
      awayTeamId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "teams",
          key: "id",
        },
        field: "away_team_id",
      },
      awayTeamGoals: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: "away_team_goals",
      },
      inProgress: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: "in_progress",
      },
    });
  },

  down: async (queryInterface: { dropTable: (arg0: string) => any }) => {
    await queryInterface.dropTable("matches");
    
  },
};
