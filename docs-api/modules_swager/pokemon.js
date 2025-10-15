// Routes et schémas pour les Pokémon
const pokemonPaths = {
  '/api/pokemon': {
    get: {
      tags: ['Pokemon'],
      summary: 'Récupérer tous les Pokémon',
      description: 'Retourne la liste complète des Pokémon avec leurs relations',
      responses: {
        '200': {
          description: 'Liste des Pokémon récupérée avec succès',
          content: {
            'application/json': {
              schema: {
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
                      $ref: '#/components/schemas/Pokemon'
                    }
                  }
                },
                required: ['success', 'count', 'data']
              }
            }
          }
        }
      }
    },
    post: {
      tags: ['Pokemon'],
      summary: 'Créer un nouveau Pokémon',
      description: 'Ajoute un nouveau Pokémon dans la base de données',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/PokemonCreate'
            },
            examples: {
              pokemon_example: {
                summary: 'Exemple de création de Pokémon',
                value: {
                  number: 2025,
                  name: 'Test Pokemon',
                  types: ['Electric', 'Flying'],
                  imageUrl: ['https://example.com/pokemon.png'],
                  trainer: '68e8dd92cb53f927824374b8',
                  zones: ['68e91777ce8c9ffb6d0490f1']
                }
              }
            }
          }
        }
      },
      responses: {
        '201': {
          description: 'Pokémon créé avec succès',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    type: 'boolean',
                    example: true
                  },
                  data: {
                    $ref: '#/components/schemas/Pokemon'
                  }
                },
                required: ['success', 'data']
              }
            }
          }
        }
      }
    }
  },
  '/api/pokemon/{id}': {
    get: {
      tags: ['Pokemon'],
      summary: 'Récupérer un Pokémon par ID',
      description: 'Retourne les détails d\'un Pokémon spécifique',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID unique du Pokémon',
          schema: {
            type: 'string',
            format: 'objectId'
          },
          example: '507f1f77bcf86cd799439011'
        }
      ],
      responses: {
        '200': {
          description: 'Pokémon trouvé',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    type: 'boolean',
                    example: true
                  },
                  data: {
                    $ref: '#/components/schemas/Pokemon'
                  }
                },
                required: ['success', 'data']
              }
            }
          }
        },
        '404': {
          description: 'Pokemon non trouvé',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    type: 'boolean',
                    example: false
                  },
                  message: {
                    type: 'string',
                    example: 'Pokemon non trouvé'
                  }
                }
              }
            }
          }
        }
      }
    },
    put: {
      tags: ['Pokemon'],
      summary: 'Mettre à jour un Pokémon',
      description: 'Modifie les informations d\'un Pokémon existant',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID unique du Pokémon',
          schema: {
            type: 'string',
            format: 'objectId'
          },
          example: '507f1f77bcf86cd799439011'
        }
      ],
      requestBody: {
        required: true,
      },
      responses: {
        '200': {
          description: 'Pokémon mis à jour avec succès',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    type: 'boolean',
                    example: true
                  },
                  data: {
                    $ref: '#/components/schemas/Pokemon'
                  }
                },
                required: ['success', 'data']
              }
            }
          }
        },
        '404': {
          description: 'Pokemon non trouvé',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    type: 'boolean',
                    example: false
                  },
                  message: {
                    type: 'string',
                    example: 'Pokemon non trouvé'
                  }
                }
              }
            }
          }
        }
      }
    },
    delete: {
      tags: ['Pokemon'],
      summary: 'Supprimer un Pokémon',
      description: 'Supprime définitivement un Pokémon de la base de données',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID unique du Pokémon',
          schema: {
            type: 'string',
            format: 'objectId'
          },
          example: '507f1f77bcf86cd799439011'
        }
      ],
      responses: {
        '200': {
          description: 'Pokémon supprimé avec succès',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    type: 'boolean',
                    example: true
                  },
                  message: {
                    type: 'string',
                    example: 'Pokemon supprimé avec succès'
                  }
                },
                required: ['success', 'message']
              }
            }
          }
        },
        '404': {
          description: 'Pokemon non trouvé',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    type: 'boolean',
                    example: false
                  },
                  message: {
                    type: 'string',
                    example: 'Pokemon non trouvé'
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

// Schémas pour les Pokémon
const pokemonSchemas = {
  Pokemon: {
    type: 'object',
    properties: {
      _id: {
        type: 'string',
        format: 'objectId',
        description: 'Identifiant unique MongoDB',
        example: '507f1f77bcf86cd799439011'
      },
      number: {
        type: 'integer',
        description: 'Numéro unique du Pokémon dans le Pokédex',
        minimum: 1,
        example: 125
      },
      name: {
        type: 'string',
        description: 'Nom du Pokémon',
        example: 'Electabuzz'
      },
      types: {
        type: 'array',
        items: {
          type: 'string'
        },
        description: 'Types du Pokémon',
        example: ['Electric']
      },
      imageUrl: {
        type: 'array',
        items: {
          type: 'string',
          format: 'uri'
        },
        description: 'URLs des images du Pokémon',
        example: ['https://localhost:3000/public/pokemon/125.png']
      },
      trainer: {
        type: 'object',
        description: 'Dresseur propriétaire du Pokémon (relation populée)',
        properties: {
          _id: {
            type: 'string',
            format: 'objectId'
          },
          name: {
            type: 'string'
          },
          age: {
            type: 'integer'
          }
        }
      },
      zones: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              format: 'objectId'
            },
            name: {
              type: 'string'
            },
            region: {
              type: 'string'
            }
          }
        },
        description: 'Zones où vit le Pokémon (relations populées)'
      }
    },
    required: ['number', 'name', 'types']
  },
  PokemonCreate: {
    type: 'object',
    properties: {
      number: {
        type: 'integer',
        description: 'Numéro unique du Pokémon',
        minimum: 1,
        example: 2025
      },
      name: {
        type: 'string',
        description: 'Nom du Pokémon',
        example: 'Test Pokemon'
      },
      types: {
        type: 'array',
        items: {
          type: 'string'
        },
        minItems: 1,
        description: 'Types du Pokémon',
        example: ['Electric', 'Flying']
      },
      imageUrl: {
        type: 'array',
        items: {
          type: 'string',
          format: 'uri'
        },
        description: 'URLs des images',
        example: ['https://example.com/pokemon.png']
      },
      trainer: {
        type: 'string',
        format: 'objectId',
        description: 'ID du dresseur propriétaire',
        example: '68e8dd92cb53f927824374b8'
      },
      zones: {
        type: 'array',
        items: {
          type: 'string',
          format: 'objectId'
        },
        description: 'IDs des zones où vit le Pokémon',
        example: ['68e91777ce8c9ffb6d0490f1']
      }
    },
    required: ['number', 'name', 'types']
  }
};

module.exports = {
  pokemonPaths,
  pokemonSchemas
};