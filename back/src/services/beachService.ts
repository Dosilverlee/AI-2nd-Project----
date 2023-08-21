import { BeachByBeachName, BeachByRegion, Beaches } from "../db/models/Beach";
import { IBeach } from "beach";

// 해수욕장 명칭 하나로 가져오기
async function getBeachByBeachNameService(name: IBeach): Promise<IBeach[]> {
  const beachDataOne = await BeachByBeachName(name);
  return beachDataOne;
}

// 지역별 가져오기
async function getBeachByRegionService(address: IBeach): Promise<IBeach[]> {
  const beachDataRegion = await BeachByRegion(address);
  return beachDataRegion;
}

// 전체 가져오기
async function getBeachesService(): Promise<IBeach[]> {
  const beachData = await Beaches();
  if (beachData.length === 0) {
    return [];
  }

  // 모든 이력을 배열로 변환
  const beachDataResult: IBeach[] = beachData.map(beach => ({
    id: beach.id,
    name: beach.name,
    address: beach.address,
    goodnessFit: beach.goodnessFit,
    eschScore: beach.eschScore,
    enteScore: beach.enteScore,
    ente: beach.ente,
    esch: beach.esch,
    latitude: beach.latitude,
    longitude: beach.longitude,
  }));

  return beachDataResult;
}


export { getBeachByBeachNameService, getBeachByRegionService, getBeachesService };