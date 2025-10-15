// Routes et schémas pour les Zones
const zonePaths = {
  '/api/zones': {
    get: {
      tags: ['Zones'],
      summary: 'Récupérer toutes les zones',
      description: 'Retourne la liste de toutes les zones avec leurs Pokémon',
      responses: {
        '200': {
          description: 'Liste des zones récupérée avec succès',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ZoneListResponse'
              }
            }
          }
        }
      }
    },
    post: {
      tags: ['Zones'],
      summary: 'Créer une nouvelle zone',
      description: 'Ajoute une nouvelle zone géographique',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ZoneCreate'
            },
            examples: {
              zone_example: {
                summary: 'Exemple de création de zone',
                value: {
                  name: 'Forêt de Jade',
                  region: 'Kanto',
                  pokemons: ['507f1f77bcf86cd799439011']
                }
              }
            }
          }
        }
      },
      responses: {
        '201': {
          description: 'Zone créée avec succès',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Zone'
              }
            }
          }
        },
        '401': {
          description: 'Authentification requise',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Authentification requise'
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  '/api/zones/{id}': {
    get: {
      tags: ['Zones'],
      summary: 'Récupérer une zone par ID',
      description: 'Retourne les détails d\'une zone avec ses Pokémon',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID unique de la zone',
          schema: {
            type: 'string',
            format: 'objectId'
          },
          example: '507f1f77bcf86cd799439011'
        }
      ],
      responses: {
        '200': {
          description: 'Zone trouvée',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Zone'
              }
            }
          }
        }
      }
    },
    put: {
      tags: ['Zones'],
      summary: 'Mettre à jour une zone',
      description: 'Modifie les informations d\'une zone existante',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID unique de la zone',
          schema: {
            type: 'string',
            format: 'objectId'
          },
          example: '507f1f77bcf86cd799439011'
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ZoneUpdate'
            }
          }
        }
      },
      responses: {
        '200': {
          description: 'Zone mise à jour avec succès',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Zone'
              }
            }
          }
        }
      }
    },
    delete: {
      tags: ['Zones'],
      summary: 'Supprimer une zone',
      description: 'Supprime définitivement une zone et met à jour les Pokémon associés',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID unique de la zone',
          schema: {
            type: 'string',
            format: 'objectId'
          },
          example: '507f1f77bcf86cd799439011'
        }
      ],
      responses: {
        '200': {
          description: 'Zone supprimée avec succès',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Zone supprimée avec succès'
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

// Schémas pour les Zones
const zoneSchemas = {
  Zone: {
    type: 'object',
    properties: {
      _id: {
        type: 'string',
        format: 'objectId',
        description: 'Identifiant unique MongoDB',
        example: '507f1f77bcf86cd799439011'
      },
      name: {
        type: 'string',
        description: 'Nom de la zone',
        example: 'Forêt de Jade'
      },
      region: {
        type: 'string',
        description: 'Région de la zone',
        example: 'Kanto'
      },
      pokemons: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              format: 'objectId'
            },
            number: {
              type: 'integer'
            },
            name: {
              type: 'string'
            },
            types: {
              type: 'array',
              items: {
                type: 'string'
              }
            }
          }
        },
        description: 'Pokémon vivant dans cette zone (relation populée)'
      }
    },
    required: ['name', 'region']
  },
  ZoneCreate: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'Nom unique de la zone',
        example: 'Forêt de Jade'
      },
      region: {
        type: 'string',
        description: 'Région de la zone',
        example: 'Kanto'
      },
      pokemons: {
        type: 'array',
        items: {
          type: 'string',
          format: 'objectId'
        },
        description: 'IDs des Pokémon vivant dans cette zone',
        example: ['507f1f77bcf86cd799439011']
      }
    },
    required: ['name', 'region']
  },
  ZoneUpdate: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        example: 'Forêt Mystique'
      },
      region: {
        type: 'string',
        example: 'Johto'
      },
      pokemons: {
        type: 'array',
        items: {
          type: 'string',
          format: 'objectId'
        },
        example: ['507f1f77bcf86cd799439011', '507f1f77bcf86cd799439012']
      }
    }
  },
  ZoneListResponse: {
    type: 'object',
    properties: {
      success: {
        type: 'boolean',
        example: true
      },
      count: {
        type: 'integer',
        example: 2
      },
      data: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/Zone'
        }
      }
    },
    required: ['success', 'count', 'data']
  }
};

module.exports = {
  zonePaths,
  zoneSchemas
};