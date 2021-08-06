/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/api/info/': {
    get: {
      responses: {
        /** OK */
        200: {
          content: {
            'application/json': components['schemas']['Info']
          }
        }
        default: components['responses']['DEFAULT_ERROR']
      }
    }
  }
  '/api/events/': {
    get: {
      parameters: {
        query: {
          id?: number
          name?: string
        }
      }
      responses: {
        /** OK */
        200: {
          content: {
            'application/json': components['schemas']['Event'][]
          }
        }
        422: components['responses']['UNPROCESSABLE_ENTITY']
        default: components['responses']['DEFAULT_ERROR']
      }
    }
    put: {
      responses: {
        /** No Content */
        204: never
        /** Return 404 Not Found if the id provided is not valid */
        404: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
        422: components['responses']['UNPROCESSABLE_ENTITY']
        default: components['responses']['DEFAULT_ERROR']
      }
      requestBody: {
        content: {
          'application/json': components['schemas']['EventUpdate']
        }
      }
    }
    post: {
      responses: {
        /** Created */
        201: {
          content: {
            'application/json': components['schemas']['Event']
          }
        }
        422: components['responses']['UNPROCESSABLE_ENTITY']
        default: components['responses']['DEFAULT_ERROR']
      }
      requestBody: {
        content: {
          'application/json': components['schemas']['EventCreate']
        }
      }
    }
    delete: {
      responses: {
        /** No Content */
        204: never
        422: components['responses']['UNPROCESSABLE_ENTITY']
        default: components['responses']['DEFAULT_ERROR']
      }
      requestBody: {
        content: {
          'application/json': components['schemas']['EventDelete'][]
        }
      }
    }
  }
  '/api/events/{id}': {
    get: {
      parameters: {
        path: {
          id: string
        }
        query: {
          id?: number
          name?: string
        }
      }
      responses: {
        /** OK */
        200: {
          content: {
            'application/json': components['schemas']['Event']
          }
        }
        422: components['responses']['UNPROCESSABLE_ENTITY']
        default: components['responses']['DEFAULT_ERROR']
      }
    }
    put: {
      parameters: {
        path: {
          id: string
        }
      }
      responses: {
        /** Forbidden */
        403: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
        default: components['responses']['DEFAULT_ERROR']
      }
    }
    post: {
      parameters: {
        path: {
          id: string
        }
      }
      responses: {
        /** Forbidden */
        403: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
        default: components['responses']['DEFAULT_ERROR']
      }
    }
    delete: {
      parameters: {
        path: {
          id: string
        }
      }
      responses: {
        /** No Content */
        204: never
        /** Return 404 Not Found if the id provided is not valid */
        404: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
        default: components['responses']['DEFAULT_ERROR']
      }
    }
    parameters: {
      path: {
        id: string
      }
    }
  }
  '/api/pieces/': {
    get: {
      parameters: {
        query: {
          opus?: number
          type?: number
          name?: string
          lyricist?: string
          created_time?: string
          copyright_expire_date?: string
          author?: string
          arranger?: string
          id?: number
        }
      }
      responses: {
        /** OK */
        200: {
          content: {
            'application/json': components['schemas']['Piece'][]
          }
        }
        422: components['responses']['UNPROCESSABLE_ENTITY']
        default: components['responses']['DEFAULT_ERROR']
      }
    }
    put: {
      responses: {
        /** No Content */
        204: never
        /** Return 404 Not Found if the id provided is not valid */
        404: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
        422: components['responses']['UNPROCESSABLE_ENTITY']
        default: components['responses']['DEFAULT_ERROR']
      }
      requestBody: {
        content: {
          'application/json': components['schemas']['PieceUpdate']
        }
      }
    }
    post: {
      responses: {
        /** Created */
        201: {
          content: {
            'application/json': components['schemas']['Piece']
          }
        }
        /** Return 409 Conflict if the provided name is the same as an existing name */
        409: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
        422: components['responses']['UNPROCESSABLE_ENTITY']
        default: components['responses']['DEFAULT_ERROR']
      }
      requestBody: {
        content: {
          'application/json': components['schemas']['PieceCreate']
        }
      }
    }
    delete: {
      responses: {
        /** No Content */
        204: never
        /** Return 404 Not Found if the id provided is not valid */
        404: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
        422: components['responses']['UNPROCESSABLE_ENTITY']
        default: components['responses']['DEFAULT_ERROR']
      }
      requestBody: {
        content: {
          'application/json': components['schemas']['PieceDelete'][]
        }
      }
    }
  }
  '/api/pieces/{id}': {
    get: {
      parameters: {
        path: {
          id: string
        }
        query: {
          opus?: number
          type?: number
          name?: string
          lyricist?: string
          created_time?: string
          copyright_expire_date?: string
          author?: string
          arranger?: string
          id?: number
        }
      }
      responses: {
        /** OK */
        200: {
          content: {
            'application/json': components['schemas']['Piece']
          }
        }
        422: components['responses']['UNPROCESSABLE_ENTITY']
        default: components['responses']['DEFAULT_ERROR']
      }
    }
    put: {
      parameters: {
        path: {
          id: string
        }
      }
      responses: {
        /** Forbidden */
        403: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
        default: components['responses']['DEFAULT_ERROR']
      }
    }
    post: {
      parameters: {
        path: {
          id: string
        }
      }
      responses: {
        /** Forbidden */
        403: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
        default: components['responses']['DEFAULT_ERROR']
      }
    }
    delete: {
      parameters: {
        path: {
          id: string
        }
      }
      responses: {
        /** No Content */
        204: never
        /** Return 404 Not Found if the id provided is not valid */
        404: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
        default: components['responses']['DEFAULT_ERROR']
      }
    }
    parameters: {
      path: {
        id: string
      }
    }
  }
  '/api/files/': {
    get: {
      parameters: {
        query: {
          hash_id?: string
          type?: number
          name?: string
          format?: string
          filename?: string
        }
      }
      responses: {
        /** OK */
        200: {
          content: {
            'application/json': components['schemas']['File'][]
          }
        }
        422: components['responses']['UNPROCESSABLE_ENTITY']
        default: components['responses']['DEFAULT_ERROR']
      }
    }
    put: {
      responses: {
        /** Forbidden */
        403: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
        default: components['responses']['DEFAULT_ERROR']
      }
    }
    post: {
      parameters: {
        formData: {
          'files[]'?: string[]
        }
      }
      responses: {
        /** Created */
        201: {
          content: {
            'application/json': components['schemas']['File'][]
          }
        }
        /** Return 409 Conflict if the provided name is the same as an existing name */
        409: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
        422: components['responses']['UNPROCESSABLE_ENTITY']
        default: components['responses']['DEFAULT_ERROR']
      }
      requestBody: {
        content: {
          'application/x-www-form-urlencoded': components['schemas']['FileCreate']
        }
      }
    }
    delete: {
      responses: {
        /** No Content */
        204: never
        /** Return 404 Not Found if the id provided is not valid */
        404: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
        422: components['responses']['UNPROCESSABLE_ENTITY']
        default: components['responses']['DEFAULT_ERROR']
      }
      requestBody: {
        content: {
          'application/json': components['schemas']['FileDelete'][]
        }
      }
    }
  }
  '/api/files/{hash_id}': {
    get: {
      parameters: {
        path: {
          hash_id: string
        }
      }
      responses: {
        /** OK */
        200: unknown
        /** Return 404 Not Found if the id provided is not valid */
        404: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
        default: components['responses']['DEFAULT_ERROR']
      }
    }
    put: {
      parameters: {
        path: {
          hash_id: string
        }
      }
      responses: {
        /** Forbidden */
        403: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
        default: components['responses']['DEFAULT_ERROR']
      }
    }
    post: {
      parameters: {
        path: {
          hash_id: string
        }
      }
      responses: {
        /** Forbidden */
        403: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
        default: components['responses']['DEFAULT_ERROR']
      }
    }
    delete: {
      parameters: {
        path: {
          hash_id: string
        }
      }
      responses: {
        /** No Content */
        204: never
        /** Return 404 Not Found if the id provided is not valid */
        404: {
          content: {
            'application/json': components['schemas']['Error']
          }
        }
        default: components['responses']['DEFAULT_ERROR']
      }
    }
    parameters: {
      path: {
        hash_id: string
      }
    }
  }
}

export interface components {
  schemas: {
    Group: {
      id: number
      name: string
    }
    Part: {
      group_id: number
      id: number
      name: string
    }
    Instrument: {
      part_id: number
      id: number
      name: string
    }
    Info: {
      groups?: components['schemas']['Group'][]
      parts?: components['schemas']['Part'][]
      instruments?: components['schemas']['Instrument'][]
    }
    Error: {
      /** Error message */
      message?: string
      /** Error code */
      code?: number
      /** Error name */
      status?: string
      /** Errors */
      errors?: { [key: string]: any }
    }
    EventPiece: {
      order: number
      piece_id: number
      id: number
    }
    Event: {
      name: string
      id: number
      pieces?: components['schemas']['EventPiece'][]
    }
    EventPieceCreate: {
      order: number
      id: number
    }
    EventCreate: {
      pieces?: components['schemas']['EventPieceCreate'][]
      name: string
    }
    EventUpdate: {
      pieces?: components['schemas']['EventPieceCreate'][]
      id: number
      name: string
    }
    EventDelete: {
      id: number
    }
    Instrumentation: {
      files?: { [key: string]: any }[]
      piece?: { [key: string]: any } | null
      id: number
      instrument?: { [key: string]: any } | null
    }
    Piece: {
      opus?: number | null
      type?: number | null
      name: string
      instrumentations?: components['schemas']['Instrumentation'][]
      lyricist?: string | null
      created_time?: string | null
      copyright_expire_date?: string | null
      author?: string | null
      arranger?: string | null
      id: number
    }
    InstrumentationCreate: {
      instrument_id: number
    }
    PieceCreate: {
      opus?: number
      type?: number
      name: string
      group_ids: number[]
      instrumentations?: components['schemas']['InstrumentationCreate'][]
      lyricist?: string
      copyright_expire_date?: string
      author?: string
      arranger?: string
    }
    PieceUpdate: {
      opus?: number
      type?: number
      name: string
      group_ids?: number[]
      lyricist?: string
      copyright_expire_date?: string
      author?: string
      arranger?: string
      id: number
    }
    PieceDelete: {
      id: number
    }
    Transpose: {
      id: number
      instrument?: { [key: string]: any }
    }
    File: {
      hash_id?: string
      type?: number | null
      name: string
      format?: string | null
      created_time?: string | null
      transpose?: components['schemas']['Transpose']
    }
    FileCreate: {
      data: string[]
    }
    FileDelete: {
      hash_id: string
    }
  }
  responses: {
    /** Default error response */
    DEFAULT_ERROR: {
      content: {
        'application/json': components['schemas']['Error']
      }
    }
    /** Unprocessable Entity */
    UNPROCESSABLE_ENTITY: {
      content: {
        'application/json': components['schemas']['Error']
      }
    }
  }
}

export interface operations {}