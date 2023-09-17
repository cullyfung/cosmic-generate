import { genRandomRange } from '../utils';

export interface UseCosmicProps {
  client: string;
  params?: string;
  service: string;
  dto: string;
  type?: 'EW' | 'ERX';
}

export default function useCosmic({
  client,
  params,
  service,
  dto,
  type = 'ERX'
}: UseCosmicProps) {
  const E = genE({ client, params, service });
  let W = '',
    R = '',
    X = '',
    cosmic: string[] = [];
  if (type === 'EW') {
    W = genW({ service, dto });
    cosmic = [E, W];
  } else if (type === 'ERX') {
    R = genR({ service, dto });
    X = genX({ client, dto });
    cosmic = [E, R, X];
  }

  const functionProcess = genFunctionProcess({ client, service, dto, type });

  const dataGroup = ``;

  return {
    cosmic,
    dataGroup,
    functionProcess
  };
}

function genE({
  client,
  params,
  service
}: Omit<UseCosmicProps, 'dto' | 'type'>) {
  const suffixOptions = ['接口', '服务'];

  if (!params) {
    return `${client}前端服务调用${service}${
      suffixOptions[genRandomRange(suffixOptions.length)]
    }`;
  }
  return `${client}前端服务将${params}传入${service}${
    suffixOptions[genRandomRange(suffixOptions.length)]
  }`;
}

function genR({ service, dto }: Pick<UseCosmicProps, 'dto' | 'service'>) {
  const concatOptions = ['取出', '读取'];
  const suffixOptions = ['接口', '服务'];

  return `${service}${
    suffixOptions[genRandomRange(suffixOptions.length)]
  }从数据库中${concatOptions[genRandomRange(concatOptions.length)]}${dto}信息`;
}

function genX({ client, dto }: Pick<UseCosmicProps, 'client' | 'dto'>) {
  const options = ['渲染到页面', '设置到页面中', '展示'];

  return `${client}前端服务接收${dto}信息并${
    options[genRandomRange(options.length)]
  }`;
}

function genW({ service, dto }: Pick<UseCosmicProps, 'service' | 'dto'>) {
  const options = ['存入', '写入', '写进'];

  return `${service}服务将${dto}信息${
    options[genRandomRange(options.length)]
  }数据库中`;
}

function genFunctionProcess({
  client,
  service,
  dto,
  type
}: Omit<UseCosmicProps, 'params'>) {
  if (type === 'ERX') {
    return `${client}前端服务调用${service}接口，获取${dto}信息并展示`;
  }
  if (type === 'EW') {
    return `${client}前端服务调用${service}服务,将${dto}信息写入数据库中`;
  }
  return '';
}
