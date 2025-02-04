#include <windows.h>
#include <iostream>

struct SharedData {
    int id;
    float value;
    char name[32];
};

int main() {
    // 공유 메모리 핸들 생성
    HANDLE hMapFile = CreateFileMapping(
        INVALID_HANDLE_VALUE,    // 페이지 파일을 기반으로 함
        NULL,                    // 기본 보안 속성
        PAGE_READWRITE,          // 읽기/쓰기 가능
        0, sizeof(SharedData),   // 크기 설정
        L"Global\\MySharedMemory" // 공유 메모리 이름 (Global 네임스페이스)
    );

    if (hMapFile == NULL) {
        std::cerr << "CreateFileMapping 실패: " << GetLastError() << std::endl;
        return 1;
    }

    // 메모리 맵핑을 프로세스 주소 공간에 매핑
    SharedData* pSharedData = (SharedData*)MapViewOfFile(
        hMapFile, FILE_MAP_ALL_ACCESS, 0, 0, sizeof(SharedData));

    if (pSharedData == NULL) {
        std::cerr << "MapViewOfFile 실패: " << GetLastError() << std::endl;
        CloseHandle(hMapFile);
        return 1;
    }

    // 데이터 쓰기
    pSharedData->id = 1;
    pSharedData->value = 3.14f;
    strcpy_s(pSharedData->name, "SharedMemoryTest");

    std::cout << "공유 메모리에 데이터 작성 완료" << std::endl;
    std::cout << "Press Enter to close..." << std::endl;
    std::cin.get(); // 종료 전 대기

    // 공유 메모리 해제
    UnmapViewOfFile(pSharedData);
    CloseHandle(hMapFile);

    return 0;
}