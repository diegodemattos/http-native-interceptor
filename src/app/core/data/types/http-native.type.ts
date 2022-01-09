export type HttpMethod =
  | 'get'
  | 'post'
  | 'put'
  | 'patch'
  | 'head'
  | 'delete'
  | 'upload'
  | 'download';

export type Serializer = 'utf8' | 'json' | 'utf8' | 'multipart' | 'raw';
